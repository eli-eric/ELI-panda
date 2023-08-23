import { useDeferredValue, useEffect, useState } from 'react'

export const DefferedInput = ({
  value: initialValue,
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
    if (query === deferredQuery) onChange(deferredQuery)
  }, [deferredQuery, query, onChange])

  return (
    <input
      {...props}
      value={query}
      onChange={e => {
        setQuery(e.target.value)
      }}
      name={'filter'}
      className={className}
    />
  )
}
