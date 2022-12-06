import React from 'react'

export const messageFormatters = {
  medium: (chunks: string) => <span className="font-medium">{chunks}</span>
}

export const createMessageValues = (values: any = {}): Record<string, any> => ({
  ...messageFormatters,
  ...Object.entries(values).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        typeof value === 'number' || typeof value === 'string' || React.isValidElement(value as any)
          ? value
          : JSON.stringify(value)
    }),
    {}
  )
})
