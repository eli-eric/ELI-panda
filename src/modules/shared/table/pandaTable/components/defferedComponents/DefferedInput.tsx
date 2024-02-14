import { useContext, useDeferredValue, useEffect, useState } from 'react'

import { classNames } from '@/utils'

import { TableSettingsContext } from '../../PandaTable'

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
  const settings = useContext(TableSettingsContext)
  const { manualFiltering } = settings || {}

  const defferedQuery = useDeferredValue(query)

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (manualFiltering) {
      if (defferedQuery === query) {
        const timer = setTimeout(() => {
          onChange(defferedQuery)
        }, 500)
        return () => {
          clearTimeout(timer)
        }
      }
    } else {
      defferedQuery === query && onChange(defferedQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, manualFiltering, defferedQuery])

  return (
    <input
      {...props}
      value={query}
      className={classNames('form-field rounded-md', className)}
      onChange={e => {
        setQuery(e.target.value)
      }}
      name={'filter'}
    />
  )
}
