import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

import { schema } from '../components/form/ItemForm.schema'
import type { CatalogueItem } from '../types/responses'
import useItem from './useItem'

type CatalogueItemWithGalleryWatch = CatalogueItem & {
  hasImageGalleryChanges: boolean
}

const useItemForm = () => {
  const item = useItem()

  const formMethods = useForm<CatalogueItemWithGalleryWatch>({
    resolver: yupResolver(schema),
    defaultValues: { ...item?.item, hasImageGalleryChanges: false }
  })
  const { control, formState } = formMethods
  useFormNotification<CatalogueItemWithGalleryWatch>({ control })
  const FormWarningModal = useFormLeaveWarning<CatalogueItemWithGalleryWatch>({ formState })

  return {
    ...formMethods,
    FormWarningModal
  }
}

export default useItemForm
