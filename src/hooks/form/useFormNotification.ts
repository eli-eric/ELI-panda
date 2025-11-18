import { useEffect } from 'react'
import { type Control, type FieldValues, useFormState } from 'react-hook-form'
import { toast } from 'sonner'

interface Props<T extends FieldValues> {
  control: Control<T, any>
}

const useFormNotification = <T extends FieldValues>({ control }: Props<T>) => {
  const { isSubmitted, errors } = useFormState<T>({ control })
  //  check if there is any error in the form and show it
  useEffect(() => {
    const ErrorArray = Object.keys(errors || {})
    if (isSubmitted) {
      ErrorArray.length > 0 &&
        ErrorArray.forEach(error => {
          const fieldError = errors[error]
          toast.error(fieldError?.message as string, { duration: 2000 })
        })
    }
  }, [isSubmitted, errors])
}

export default useFormNotification
