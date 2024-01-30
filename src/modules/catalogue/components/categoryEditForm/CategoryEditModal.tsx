import { type Dispatch, Fragment, type SetStateAction, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormattedMessage } from 'react-intl'
import { mutate } from 'swr'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

import { useCategoryList } from '../../hooks/useCategoryList'
import { formatData } from '../../utils'
import CategoryEditForm from './CategoryEditForm'

const { buttons } = message.common
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  parentUID?: string
  uid?: string
}

const CategoryEditModal = ({ setOpen, parentUID, uid }: Props) => {
  const { catalogueCategoryEdit, catalogueCategoryImage } = useEndpoint({
    uid
  })

  const { refetch } = useCategoryList()

  const { submit, loading, error } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post',
    onSuccess: () => {
      refetch()
      mutate(catalogueCategoryEdit)
      mutate(catalogueCategoryImage)
      setOpen(false)
    }
  })
  const onSubmit = (data: CategoryFormType) => {
    submit(formatData(data, parentUID))
  }

  return (
    <Fragment>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<ProgressBarComponent />}>
          <CategoryEditForm onSubmit={onSubmit} uid={uid}>
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
            {error && <ErrorPage />}
          </CategoryEditForm>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

export default CategoryEditModal
