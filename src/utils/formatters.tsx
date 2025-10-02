import moment from 'moment'
import React from 'react'

/* formmaters for i18n messages */
let formatterCounter = 0

export const messageFormatters = {
  medium: (chunks: React.ReactNode) => {
    const key = `medium-${formatterCounter++}`
    return (
      <span key={key} className="font-medium">
        {chunks}
      </span>
    )
  },
  small: (chunks: React.ReactNode) => {
    const key = `small-${formatterCounter++}`
    return (
      <span key={key} className="text-xs">
        {chunks}
      </span>
    )
  },
  strong: (chunks: React.ReactNode) => {
    const key = `strong-${formatterCounter++}`
    return (
      <span key={key} className="font-bold">
        {chunks}
      </span>
    )
  },
  underline: (chunks: React.ReactNode) => {
    const key = `underline-${formatterCounter++}`
    return (
      <span key={key} className="underline">
        {chunks}
      </span>
    )
  },
  label: (chunks: React.ReactNode) => {
    const key = `label-${formatterCounter++}`
    return (
      <span
        key={key}
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {chunks}
      </span>
    )
  },
  p: (chunks: React.ReactNode) => {
    const key = `p-${formatterCounter++}`
    return (
      <p key={key} className="text-gray-500 dark:text-gray-200">
        {chunks}
      </p>
    )
  }
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
