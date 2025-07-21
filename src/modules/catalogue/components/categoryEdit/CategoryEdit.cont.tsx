'use client'
import { useQueryClient } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import type { CodebookType } from '@/types/responses/codebook'

import { useCatalogueItems } from '../../hooks/useCatalogueItems'
import { useCategory } from '../../hooks/useCategory'
import { useCategoryDetail } from '../../hooks/useCategoryDetail'
import { useCategoryList } from '../../hooks/useCategoryList'
import { formatData } from '../../utils'
import CategoryEditForm from './form/CategoryEdit.form'
import type { CategoryFormType } from './types'

const { buttons } = message.common
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
  const { categoryDetail, isLoading, queryKey } = useCategoryDetail(uid)
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

  if (isLoading) return <ProgressBarComponent />

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
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t mt-6">
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
          </div>
        </CategoryEditForm>
      )}
    </div>
  )
}

export default CategoryEditContainer
