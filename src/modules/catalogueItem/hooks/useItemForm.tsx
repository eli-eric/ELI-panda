import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

import { schema } from '../components/form/ItemForm.schema'
import type { CatalogueItem } from '../types/responses'
import useItem from './useItem'

const useItemForm = () => {
  const item = useItem()

  const formMethods = useForm<CatalogueItem>({
    resolver: yupResolver(schema),
    defaultValues: item?.item
  })
  const { control, formState } = formMethods
  useFormNotification<CatalogueItem>({ control })
  const FormWarningModal = useFormLeaveWarning<CatalogueItem>({ formState })

  return {
    ...formMethods,
    FormWarningModal
  }
}

export default useItemForm
