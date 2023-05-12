import moment from 'moment'
import React from 'react'

/* formmaters for i18n messages */
export const messageFormatters = {
  medium: (chunks: string) => <span className="font-medium">{chunks}</span>
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
