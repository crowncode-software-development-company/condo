import { LOCALES, DEFAULT_LOCALE } from 'domains/common/constants/locales'
import en from 'lang/en.json'
import ru from 'lang/ru.json'
import get from 'lodash/get'
import { IntlProvider } from 'react-intl'


import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'

type AvailableLocales = typeof LOCALES[number]
// NOTE: Combine all keys together
type MessagesKeysType = keyof typeof en | keyof typeof ru
// NOTE: Require all message keys in all languages, so no lint translations needed
type MessagesType = { [Locale in AvailableLocales]: { [Key in MessagesKeysType]: string } }

const MESSAGES: MessagesType = {
    ru,
    en,
}

// NOTE: Override global interface allows us to use autocomplete in intl
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace FormatjsIntl {
        interface Message {
            ids: MessagesKeysType
        }
    }
}

export default function App ({ Component, pageProps, router }: AppProps): ReactNode {
    const { locale = DEFAULT_LOCALE } = router

    return (
        <IntlProvider locale={locale} messages={get(MESSAGES, locale, {})}>
            <Component {...pageProps}/>
        </IntlProvider>
    )
}