'use client'
import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/Buttons'
import { Skeleton } from '@/components/ui/skeleton'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { useCatalogueItems } from '../../hooks/useCatalogueItems'
import { useCategory } from '../../hooks/useCategory'
import { useCategoryDetail } from '../../hooks/useCategoryDetail'
import { useCategoryList } from '../../hooks/useCategoryList'
import { formatData } from '../../utils'
import CategoryEditForm from './form/CategoryEdit.form'
import type { CategoryFormType } from './types'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  parentUID?: string
  uid?: string
}

const CategoryEditContainer = ({ setOpen, parentUID, uid }: Props) => {
  const { formatMessage: fm } = useIntl()
  const { catalogueCategoryEdit } = useEndpoint({
    uid
  })

  const { refetch: refetchItems } = useCatalogueItems()

  const imageRef = useRef<ImageGalleryRef>(null)

  const { catalogueCategory } = useCategory()
  const {
    categoryDetail,
    isLoading,
    error,
    refetch: refetchCategoryDetail,
    queryKey
  } = useCategoryDetail(uid)
  // removed unused loadingSubmit state (was previously set but not used for UI)
  const queryClient = useQueryClient()
  const { closeModal } = useModalGlobalStore()

  const { refetch } = useCategoryList()

  const { submit } = useSubmit<{ uid: string; name: string }>({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post',
    onSuccess: data => {
      imageRef.current?.submit(data.uid, () => {
        refetch()
        refetchItems()
        toast.success(
          fm({ id: message.catalogue.category.saved }, { name: data.name })
        )
        closeModal('sheet')
        queryClient.invalidateQueries({ queryKey })
      })
    },
    onError: () => {
      toast.error(fm({ id: message.catalogue.category.errorSaving }))
    }
  })
  const onSubmit = (data: CategoryFormType) => {
    submit(formatData(data, parentUID))
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        {/* Form title */}
        <Skeleton className="h-6 w-48" />

        {/* Basic info section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>

        {/* Categories section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Properties section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-16" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-4">
          <h3 className="text-lg font-semibold mb-2">
            {fm({ id: message.catalogue.category.errorLoading })}
          </h3>
          <p className="text-sm">
            {error instanceof Error
              ? error.message
              : fm({ id: message.catalogue.category.failedToLoadDetails })}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => refetchCategoryDetail()}>
            {fm({ id: message.catalogue.category.retry })}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {fm({ id: message.common.buttons.close })}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <CategoryEditForm
        onSubmit={onSubmit}
        uid={uid}
        imageRef={imageRef}
        categoryDetail={categoryDetail as CategoryFormType}
        systemType={catalogueCategory?.systemType as CodebookType}
      ></CategoryEditForm>
    </div>
  )
}

export default CategoryEditContainer
