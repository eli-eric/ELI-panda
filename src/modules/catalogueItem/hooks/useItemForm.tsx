import { yupResolver } from '@hookform/resolvers/yup'
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'

import { schema } from '../components/form/ItemForm.schema'
import type { CatalogueItem } from '../types/responses'
import useItem from './useItem'

type CatalogueItemWithGalleryWatch = CatalogueItem & {
  hasImageGalleryChanges: boolean
}

const useItemForm = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
  const item = useItem()
  const hasChanges = imageRef?.current?.hasChanges ?? false
  const formMethods = useForm<CatalogueItemWithGalleryWatch>({
    resolver: yupResolver(schema),
    defaultValues: { ...item?.item, hasImageGalleryChanges: false }
  })

  const { setValue } = formMethods
  useEffect(() => {
    setValue('hasImageGalleryChanges', hasChanges, { shouldDirty: hasChanges })
  }, [hasChanges, setValue])

  const { control, formState } = formMethods
  useFormNotification<CatalogueItemWithGalleryWatch>({ control })
  const FormWarningModal = useFormLeaveWarning<CatalogueItemWithGalleryWatch>({
    formState
  })

  return {
    ...formMethods,
    FormWarningModal
  }
}

export default useItemForm
