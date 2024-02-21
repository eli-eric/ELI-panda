import moment from 'moment'
import React from 'react'

/* formmaters for i18n messages */
export const messageFormatters = {
  medium: (chunks: string) => <span className="font-medium">{chunks}</span>,
  small: (chunks: string) => <span className="text-xs">{chunks}</span>,
  strong: (chunks: string) => <span className="font-bold">{chunks}</span>,
  underline: (chunks: string) => <span className="underline">{chunks}</span>,
  label: (chunks: string) => <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{chunks}</span>,
  p: (chunks: string) => <p className="text-gray-500 dark:text-gray-200">{chunks}</p>
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
  return moment(date).startOf('day').utcOffset(new Date().getTimezoneOffset()).format()
}
