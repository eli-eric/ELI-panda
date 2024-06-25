'use client'
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useRef,
  useState
} from 'react'
import toast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import type { CodebookType } from '@/types/responses/codebook'

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

  const imageRef = useRef<ImageGalleryRef>(null)

  const { catalogueCategory } = useCategory()
  const { categoryDetail, isLoading } = useCategoryDetail(uid)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const { refetch } = useCategoryList()

  const { submit, loading } = useSubmit<{ uid: string; name: string }>({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post',
    onSuccess: data => {
      imageRef.current?.submit(data.uid, () => {
        refetch()
        setOpen(false)
        toast.success(`Category ${data.name} saved`)
        setLoadingSubmit(false)
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
    <Fragment>
      {categoryDetail && (
        <CategoryEditForm
          onSubmit={onSubmit}
          uid={uid}
          imageRef={imageRef}
          categoryDetail={categoryDetail as CategoryFormType}
          systemType={catalogueCategory?.systemType as CodebookType}
        >
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button
              type="submit"
              primary
              loading={loading || loadingSubmit}
              className="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
            >
              <FormattedMessage id={buttons.save} />
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpen(false)
              }}
              disabled={loading}
              className="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700 dark:text-gray-200"
            >
              <FormattedMessage id={buttons.cancel} />
            </Button>
          </div>
        </CategoryEditForm>
      )}
    </Fragment>
  )
}

export default CategoryEditContainer
