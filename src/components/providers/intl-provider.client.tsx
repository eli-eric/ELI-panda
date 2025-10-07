'use client'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'

interface Props {
  children: React.ReactNode
  locale?: string
}

export const AppIntlProvider = ({ children, locale = 'en' }: Props) => {
  return (
    <IntlProvider locale={locale} messages={messages.en} onError={() => {}}>
      {/* Cast to any to bridge differing ReactNode type versions */}
      {children as any}
    </IntlProvider>
  )
}
