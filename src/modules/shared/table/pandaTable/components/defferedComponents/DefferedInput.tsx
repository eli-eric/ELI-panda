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
    <input {...props} value={query} onChange={e => setQuery(e.target.value)} name={'filter'} className={className} />
  )
}
