'use client'
import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { Skeleton } from '@/components/ui/skeleton'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
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
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const queryClient = useQueryClient()

  const { refetch } = useCategoryList()

  const { submit, loading } = useSubmit<{ uid: string; name: string }>({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post',
    onSuccess: data => {
      imageRef.current?.submit(data.uid, () => {
        refetch()
        refetchItems()
        setOpen(false)
        toast.success(`Category ${data.name} saved`)
        setLoadingSubmit(false)

        queryClient.invalidateQueries({ queryKey })
      })
    },
    onError: () => {
      toast.error('Error saving category')
    }
  })
  const onSubmit = (data: CategoryFormType) => {
    setLoadingSubmit(true)
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
          <h3 className="text-lg font-semibold mb-2">Error Loading Category</h3>
          <p className="text-sm">
            {error instanceof Error
              ? error.message
              : 'Failed to load category details'}
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => refetchCategoryDetail()}>
            Retry
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {categoryDetail && (
        <CategoryEditForm
          onSubmit={onSubmit}
          uid={uid}
          imageRef={imageRef}
          categoryDetail={categoryDetail as CategoryFormType}
          systemType={catalogueCategory?.systemType as CodebookType}
        >
          {/*<div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t mt-6">
            <Button
              type="button"
              onClick={() => {
                setOpen(false)
              }}
              disabled={loading}
              variant="outline"
              className="order-2 sm:order-1"
            >
              <FormattedMessage id={buttons.cancel} />
            </Button>
            <Button
              type="submit"
              loading={loading || loadingSubmit}
              className="order-1 sm:order-2"
            >
              <FormattedMessage id={buttons.save} />
            </Button>
          </div>*/}
          <div className="flex sticky top-0 z-10 items-end justify-end mb-2">
            <div className="flex gap-2 pb-2">
              <Button size="sm" type="submit" disabled={loading}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  {
                    setOpen(false)
                  }
                }}
                loading={loading || loadingSubmit}
              >
                Exit
              </Button>
            </div>
          </div>
        </CategoryEditForm>
      )}
    </div>
  )
}

export default CategoryEditContainer
