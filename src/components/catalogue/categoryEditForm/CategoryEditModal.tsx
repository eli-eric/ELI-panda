import { Dispatch, Fragment, SetStateAction, Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import { Button } from '@/components/ui/Buttons'
import ProgressBarComponent from '@/components/ui/progress-bar.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { CatalogueFormType } from '@/types/catalogue/catalogueTypes'

import CategoryEditForm from './CategoryEditForm'

interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
  parentPath?: string
  uid?: string
}

const CategoryEditModal = ({ setopen, parentPath, uid }: Props) => {
  const { catalogueCategoryEdit } = useEndpoint(uid ? { uid } : {})
  const { submit, loading, error, response } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: uid ? 'put' : 'post'
  })
  const onSubmit = (data: CatalogueFormType) => {
    const formattedData =
      data.groups && data.groups.length !== 0
        ? {
            ...data,
            parentPath: data.parentPath ? data.parentPath : parentPath,
            groups: data.groups?.map(group => ({
              ...group,
              properties: group.properties?.map(prop =>
                prop.listOfValues && prop.listOfValues.length !== 0
                  ? { ...prop, listOfValues: prop.listOfValues.map(value => value.value) }
                  : { ...prop }
              )
            }))
          }
        : {
            image: data.image,
            name: data?.name,
            code: data?.code,
            parentPath: data.parentPath ? data.parentPath : parentPath
          }
    submit(formattedData)
  }
  useEffect(() => {
    if (response) if (!error) setopen(false)
  }, [response, setopen, error])

  return (
    <Fragment>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<ProgressBarComponent />}>
          <CategoryEditForm onSubmit={onSubmit} uid={uid}>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <Button
                text="Save"
                type="submit"
                loading={loading}
                customClass="inline-flex w-full justify-center sm:col-start-2 sm:mt-0 sm:text-sm"
              />
              <Button
                text="Cancel"
                buttonType="secondary"
                onClickAction={() => {
                  setopen(false)
                }}
                disabled={loading}
                customClass="inline-flex w-full justify-center sm:col-start-1 sm:mt-0 sm:text-sm text-gray-700"
              />
            </div>
          </CategoryEditForm>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

export default CategoryEditModal
