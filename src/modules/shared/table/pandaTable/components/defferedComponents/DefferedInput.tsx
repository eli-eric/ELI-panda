import { useDeferredValue, useEffect, useState } from 'react'

import { classNames } from '@/utils'

export const DefferedInput = ({
  value: initialValue = '',
  onChange,
  className,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [query, setQuery] = useState(initialValue)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (query === deferredQuery) {
      const timer = setTimeout(() => {
        onChange(deferredQuery)
      }, 500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [deferredQuery, query, onChange])

  return (
    <input
      {...props}
      value={query}
      className={classNames(
        'w-full placeholder:text-xs dark:bg-gray-900 dark:text-gray-200 placeholder:font-normal rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-xs',
        className
      )}
      onChange={e => setQuery(e.target.value)}
      name={'filter'}
    />
  )
}
