import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { ImageGalleryRef } from '@/components/ImageGallery'
import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

import { schema } from '../components/form/ItemForm.schema'
import type { CatalogueItem } from '../types/responses'
import useItem from './useItem'

type CatalogueItemWithGalleryWatch = CatalogueItem & {
  hasImageGalleryChanges: boolean
}

const useItemForm = (gallery?: ImageGalleryRef) => {
  const item = useItem()

  const formMethods = useForm<CatalogueItemWithGalleryWatch>({
    resolver: yupResolver(schema),
    defaultValues: { ...item?.item, hasImageGalleryChanges: false }
  })

  const { setValue } = formMethods
  useEffect(() => {
    setValue('hasImageGalleryChanges', gallery?.hasChanges || false, { shouldDirty: gallery?.hasChanges })
  }, [gallery, setValue])

  const { control, formState } = formMethods
  useFormNotification<CatalogueItemWithGalleryWatch>({ control })

  const FormWarningModal = useFormLeaveWarning<CatalogueItemWithGalleryWatch>({
    formState,
    config: {
      onContinue: gallery?.discard
    }
  })

  return {
    ...formMethods,
    FormWarningModal
  }
}

export default useItemForm
