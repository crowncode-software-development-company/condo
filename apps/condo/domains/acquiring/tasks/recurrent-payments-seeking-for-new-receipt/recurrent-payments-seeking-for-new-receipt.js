const dayjs = require('dayjs')
const { get } = require('lodash')

const { getLogger } = require('@open-condo/keystone/logging')
const { getRedisClient } = require('@open-condo/keystone/redis')
const { getSchemaCtx } = require('@open-condo/keystone/schema')
const { createCronTask } = require('@open-condo/keystone/tasks')

const {
    dvAndSender,
    paginationConfiguration,
} = require('@condo/domains/acquiring/tasks/utils/constants')
const {
    getAllReadyToPayRecurrentPaymentContexts,
    getReceiptsForServiceConsumer,
    sendTomorrowPaymentNotificationSafely,
} = require('@condo/domains/acquiring/tasks/utils/queries')
const {
    RecurrentPayment,
} = require('@condo/domains/acquiring/utils/serverSchema')
const { getStartDates } = require('@condo/domains/common/utils/date')
const { processArrayOf } = require('@condo/domains/common/utils/parallel')

const logger = getLogger('recurrent-payments-seeking-for-new-receipt')

const REDIS_LAST_DATE_KEY = 'LAST_RECURRENT_PAYMENT_SEEKING_RECEIPTS_CREATED_AT'

async function processContext (context, recurrentPaymentContext, periods, lastDt) {
    // prepare vars
    const { serviceConsumer, billingCategory } = recurrentPaymentContext
    const previousMonthDate = dayjs().startOf('month').subtract(1, 'days')
    const tomorrowMidnight = dayjs().add(1, 'days').startOf('day')
    const receiptsWhere = {
        period_in: periods,
        createdAt_gt: dayjs(lastDt).toISOString(),
        deletedAt: null,
    }

    // get billing receipts
    const billingReceipts = await getReceiptsForServiceConsumer(
        context,
        previousMonthDate,
        serviceConsumer,
        billingCategory,
        receiptsWhere,
    )

    // no receipts == no payment tasks
    if (billingReceipts.length === 0) {
        return
    }

    // create payment proceeding tasks
    const recurrentPayment = await RecurrentPayment.create(context, {
        ...dvAndSender,
        tryCount: 0,
        state: {},
        payAfter: tomorrowMidnight.toISOString(),
        billingReceipts: billingReceipts.map(receipt => ({ id: receipt.id })),
        recurrentPaymentContext: { connect: { id: recurrentPaymentContext.id } },
    })

    // send a message
    await sendTomorrowPaymentNotificationSafely(context, recurrentPaymentContext, recurrentPayment)
}

async function process () {
    logger.info('Start processing new billing receipts for recurrentPaymentContext tasks')

    // prepare context
    const { keystone } = await getSchemaCtx('RecurrentPaymentContext')
    const context = await keystone.createContext({ skipAccessControl: true })

    // prepare vars
    const { pageSize } = paginationConfiguration
    let offset = 0
    let hasMorePages = true
    const { prevMonthStart, thisMonthStart } = getStartDates()
    const periods = [prevMonthStart, thisMonthStart]
    const redisClient = getRedisClient()

    // prepare filter values
    const lastDt = await redisClient.get(REDIS_LAST_DATE_KEY) || thisMonthStart
    logger.info({ msg: 'Seeking for new billing receipts', lastDt })

    // retrieve BillingReceipts page by page
    while (hasMorePages) {
        logger.info(`Processing recurrentPaymentContext page #${Math.floor(offset / pageSize)}`)

        // get page (can be empty)
        const extraArgs = {
            paymentDay: null,
            autoPayReceipts: true,
        }
        const page = await getAllReadyToPayRecurrentPaymentContexts(context, dayjs(), pageSize, offset, extraArgs)

        // process each page in parallel
        await processArrayOf(page).inParallelWith(async (recurrentPaymentContext) => {
            try {
                await processContext(context, recurrentPaymentContext, periods, lastDt)
            } catch (error) {
                const message = get(error, 'errors[0].message') || get(error, 'message') || JSON.stringify(error)
                logger.error({ msg: 'Process recurrentPaymentContext error', message })
            }
        })

        hasMorePages = page.length > 0
        offset += pageSize
    }

    // update watermark value
    await redisClient.set(REDIS_LAST_DATE_KEY, dayjs().toISOString())

    logger.info('End processing new billing receipts for recurrentPaymentContext tasks')
}

module.exports = {
    process,
    processContext,
    recurrentPaymentsSeekingForNewReceiptCron: createCronTask('recurrentPaymentsSeekingForNewReceipt', '0 * * * *', process),
}