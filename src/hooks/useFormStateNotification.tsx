import { useEffect } from 'react'
import { Control, FieldValues, useFormState } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import FormError from '@/components/Notifications/FormError'

interface Props<T extends FieldValues> {
  control: Control<T, any>
}

const useFormStateNotification = <T extends FieldValues>({ control }: Props<T>) => {
  const formState = useFormState<T>({ control })
  //  check if there is any error in the form and show it
  useEffect(() => {
    const ErrorArray = Object.keys(formState.errors || {})
    if (formState.isSubmitted) {
      ErrorArray.length > 0 &&
        ErrorArray.forEach(error => {
          const fieldError = formState.errors[error]
          toast.custom(t => <FormError t={t} dismiss={toast.dismiss} message={fieldError?.message as string} />)
        })
    }
  }, [formState])

  return { ...formState }
}

export default useFormStateNotification
