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
import CategoryEditForm from './CategoryEditForm'
const formatData = (data: CategoryFormType, parentPath) =>
  data.groups && data.groups.length !== 0
    ? {
        ...data,
        parentPath: data.parentPath ? data.parentPath : parentPath,
        groups: data.groups?.map(group => ({
          ...group,
          properties: group.properties?.map(prop =>
            prop.listOfValues && prop.listOfValues.length !== 0
              ? {
                  ...prop,
                  listOfValues: prop.listOfValues.map(value => value.value)
                }
              : { ...prop }
          )
        }))
      }
    : {
        uid: data?.uid,
        image: data?.image,
        name: data?.name,
        code: data?.code,
        parentPath: data.parentPath ? data?.parentPath : parentPath
      }

const { buttons } = message.common
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  parentPath?: string
  uid?: string
}

const CategoryEditModal = ({ setOpen, parentPath = '', uid }: Props) => {
  const { catalogueCategoryEdit, catalogueCategoryImage } = useEndpoint({
    path: parentPath,
    uid
  })

  const { mutate: mutateCategories } = useCategoryList()

  const { submit, loading, error } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post',
    onSuccess: () => {
      mutateCategories()
      mutate(catalogueCategoryEdit)
      mutate(catalogueCategoryImage)
      setOpen(false)
    }
  })
  const onSubmit = (data: CategoryFormType) => {
    submit(formatData(data, parentPath))
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
                className="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700"
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
