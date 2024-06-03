import moment from 'moment'
import React from 'react'

/* formmaters for i18n messages */
export const messageFormatters = {
  medium: (chunks: string) => <span className="font-medium">{chunks}</span>,
  small: (chunks: string) => <span className="text-xs">{chunks}</span>,
  strong: (chunks: string) => <span className="font-bold">{chunks}</span>,
  underline: (chunks: string) => <span className="underline">{chunks}</span>,
  label: (chunks: string) => (
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
      {chunks}
    </span>
  ),
  p: (chunks: string) => (
    <p className="text-gray-500 dark:text-gray-200">{chunks}</p>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMessageValues = (values: any = {}): Record<string, any> => ({
  ...messageFormatters,
  ...Object.entries(values).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        typeof value === 'number' ||
        typeof value === 'string' ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.isValidElement(value as any)
          ? value
          : JSON.stringify(value)
    }),
    {}
  )
})

export function convertDate(date) {
  return moment(date)
    .startOf('day')
    .utcOffset(new Date().getTimezoneOffset())
    .format()
}

export function formatPhoneNumber(number: string) {
  number = number.toString()
  number = number.slice(3) // Odstranění kódu země (420)

  const formattedNumber = number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')

  return formattedNumber
}

export function formatDate(date) {
  const newDate = new Date(date)
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  })
  return formatter.format(newDate)
}

export function makeQuery(query: Record<string, any>) {
  return '?' + new URLSearchParams(query).toString()
}
