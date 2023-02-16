const dayjs = require('dayjs')
const { get, isEmpty } = require('lodash')
const { validate: uuidValidate } = require('uuid')

const { getLogger } = require('@open-condo/keystone/logging')
const { getSchemaCtx } = require('@open-condo/keystone/schema')

const { BANK_INTEGRATION_IDS } = require('@condo/domains/banking/constants')
const { BankAccount, BankTransaction, BankIntegration, BankIntegrationContext } = require('@condo/domains/banking/utils/serverSchema')
const { ISO_CODES } = require('@condo/domains/common/constants/currencies')
const { dvSenderFields, INVALID_DATE_RECEIVED_MESSAGE } = require('@condo/domains/organization/integrations/sbbol/constants')
const { SBBOL_IMPORT_NAME } = require('@condo/domains/organization/integrations/sbbol/constants')
const { initSbbolFintechApi } = require('@condo/domains/organization/integrations/sbbol/SbbolFintechApi')

const { ERROR_PASSED_DATE_IN_THE_FUTURE } = require('../constants')


const logger = getLogger('sbbol/SbbolSyncTransactions')
const isTransactionsReceived = (response) => (get(response, 'error.cause', '') !== 'STATEMENT_RESPONSE_PROCESSING')

/**
 * Connects new BankTransaction records for BankAccount according to transaction data from SBBOL.
 *  @param {String} userId
 *  @param {BankAccount[]} bankAccounts
 *  @param {keystoneContext} context
 *  @param {String} statementDate
 *  @param {String} organizationId
 */
async function _requestTransactions ({ userId, bankAccounts, context, statementDate, organizationId }) {
    const fintechApi = await initSbbolFintechApi(userId)

    if (!fintechApi) return

    const transactions = []

    for (const bankAccount of bankAccounts) {
        let page = 1,
            doNextRequest = true,
            timeout = 1000,
            failedReq = 0

        do {
            let response = await fintechApi.getStatementTransactions(bankAccount.number, statementDate, page)

            while (!isTransactionsReceived(response)) {
                if (failedReq > 5) {
                    break
                }
                await new Promise( (resolve) => {
                    setTimeout(async () => {
                        response = await fintechApi.getStatementTransactions(
                            bankAccount.number,
                            statementDate,
                            page
                        )
                        resolve()
                    }, timeout)
                })
                failedReq++
                timeout *= 2
            }

            const receivedTransactions = get(response, 'data.transactions')
            if (receivedTransactions) {
                receivedTransactions.map( transaction => transactions.push(transaction))
            } else {
                logger.error(`Unsuccessful response to transaction request by state: ${{ 
                    bankAccount: bankAccount.number, 
                    statementDate,
                    page,
                }}`)
            }

            page++

            // Checking that the response contains a link to the next page, if it is not there, then all transactions have been received
            if (isEmpty(get(response, 'data._links', []).filter(link => link.rel === 'next'))) {
                doNextRequest = false
            }

            // WORKFLOW_FAULT means invalid request parameters, that can occur in cases:
            // when report is requested for date in future
            // when report page does not exist, for example number is out of range of available pages
            if (get(transactions, 'error.cause') === 'WORKFLOW_FAULT') doNextRequest = false
        } while ( doNextRequest )

        for (const transaction of transactions) {
            // If SBBOL returned a transaction with an unsupported currency, do not process
            if (!isEmpty(ISO_CODES.map( currencyName => get(transaction, 'amount.currencyName') === currencyName))) {
                const formatedOperationDate = dayjs(transaction.operationDate).format('YYYY-MM-DD')
                const whereConditions = {
                    number: transaction.number,
                    date:  formatedOperationDate,
                    amount: transaction.amount.amount,
                    currencyCode: transaction.amount.currencyName,
                    purpose: transaction.paymentPurpose,
                    isOutcome: transaction.direction === 'CREDIT',
                    importId: transaction.uuid,
                    importRemoteSystem: SBBOL_IMPORT_NAME,
                }

                const foundTransaction = await BankTransaction.getOne(context, {
                    organization: { id: organizationId },
                    account: { id: bankAccount.id },
                    ...whereConditions,
                })

                if (!foundTransaction) {
                    const bankIntegrationContextId = get(bankAccount, 'integrationContext.id')
                    const createdTransaction = await BankTransaction.create(context, {
                        organization: { connect: { id: organizationId } },
                        account: { connect: { id: bankAccount.id } },
                        integrationContext: { connect: { id: bankIntegrationContextId } },
                        meta: { sbbol: transaction },
                        ...whereConditions,
                        ...dvSenderFields,
                    })
                    logger.info(`BankTransaction instance created with id: ${createdTransaction.id}`)
                }
            }
        }
    }
    return transactions
}

/**
 * Synchronizes SBBOL transaction data with data in the system
 * @param {String[] | String} date
 * @param {String} userId
 * @param {Organization} organization
 * @returns {Promise<Transaction[]>}
 */
async function requestTransactions ({ date, userId, organization }) {
    if (!uuidValidate(userId)) return logger.error(`passed userId is not a valid uuid. userId: ${userId}`)
    if (!date) return logger.error('date is required')

    const { keystone: context } = await getSchemaCtx('Organization')
    // TODO(VKislov): DOMA-5239 Should not receive deleted instances with admin context
    const bankAccounts = await BankAccount.getAll(context, {
        tin: organization.tin,
        integrationContext: {
            integration: {
                id: BANK_INTEGRATION_IDS.SBBOL,
            },
        },
        deletedAt: null,
    })
    const today = dayjs().format('YYYY-MM-DD')

    if (typeof date === 'string') {
        if (dayjs(date).format('YYYY-MM-DD') === 'Invalid Date') throw new Error(`${INVALID_DATE_RECEIVED_MESSAGE} ${date}`)

        // you can't request a report by a date in the future
        if (today < date) throw new Error(ERROR_PASSED_DATE_IN_THE_FUTURE)

        return await _requestTransactions({
            userId,
            bankAccounts,
            context,
            statementDate: date,
            organizationId: organization.id,
        })
    } else {
        const transactions = []
        for (const statementDate of date) {
            if (dayjs(statementDate).format('YYYY-MM-DD') === 'Invalid Date') throw new Error(`${INVALID_DATE_RECEIVED_MESSAGE} ${date}`)

            if (today < statementDate) throw new Error(ERROR_PASSED_DATE_IN_THE_FUTURE)

            transactions.push(await _requestTransactions({
                userId,
                bankAccounts,
                context,
                statementDate,
                organizationId: organization.id,
            }))
        }
        return transactions
    }
}

module.exports = {
    requestTransactions,
}