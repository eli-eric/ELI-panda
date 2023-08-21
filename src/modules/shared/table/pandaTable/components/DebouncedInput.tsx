import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  className,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const { register, watch } = useForm({ defaultValues: { filter: initialValue } })

  const value = watch('filter')

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, value, onChange])

  return <input {...props} {...register('filter')} className={className} />
}
