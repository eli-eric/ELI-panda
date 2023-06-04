import { yupResolver } from '@hookform/resolvers/yup'
import type { UseFormProps } from 'react-hook-form'
import type { DeepPartial, FieldValues } from 'react-hook-form'
import { useForm as useHookForm } from 'react-hook-form'
import type * as yup from 'yup'

import { useFormLeaveWarning } from './useFormLeaveWarning'
import useFormNotification from './useFormNotification'

interface UseFormPropsWithSchema<T extends FieldValues> extends UseFormProps<DeepPartial<T>> {
  schema?: yup.SchemaOf<DeepPartial<T>>
}
const useForm = <T extends FieldValues>({ schema, ...restprops }: UseFormPropsWithSchema<T> = {}) => {
  const formMethods = useHookForm<DeepPartial<T>>({
    resolver: schema ? yupResolver(schema) : undefined,
    ...restprops
  })
  const { control, formState } = formMethods
  useFormNotification<DeepPartial<T>>({ control })
  const FormWarningModal = useFormLeaveWarning<DeepPartial<T>>({ formState })
  return { ...formMethods, FormWarningModal }
}

export default useForm
