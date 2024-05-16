'use client'
import { type Dispatch, Fragment, type SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { CategoryFormType } from './types'

import { useCategoryList } from '../../hooks/useCategoryList'
import { formatData } from '../../utils'
import CategoryEditForm from './form/CategoryEdit.form'
import { useCategory } from '../../hooks/useCategory'
import { useCategoryDetail } from '../../hooks/useCategoryDetail'
import type { CodebookType } from '@/types/responses/codebook'

import ProgressBarComponent from '@/components/progress-bar.comp'
import toast from 'react-hot-toast'

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

  const { catalogueCategory } = useCategory()
  const { categoryDetail, isLoading } = useCategoryDetail(uid)

  const { refetch } = useCategoryList()

  const { submit, loading } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post',
    onSuccess: () => {
      refetch()
      setOpen(false)
    },
    onError: () => {
      toast.error('Error saving category')
    }
  })
  const onSubmit = (data: CategoryFormType) => {
    submit(formatData(data, parentUID))
  }

  if (isLoading) return <ProgressBarComponent />
  return (
    <Fragment>
      {categoryDetail && (
        <CategoryEditForm
          onSubmit={onSubmit}
          uid={uid}
          categoryDetail={categoryDetail as CategoryFormType}
          systemType={catalogueCategory?.systemType as CodebookType}
        >
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button
              type="submit"
              primary
              loading={loading}
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
