'use client'
import { type Dispatch, Fragment, type SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'
import { mutate } from 'swr'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { CategoryFormType } from './types'

import { useCategoryList } from '../../hooks/useCategoryList'
import { formatData } from '../../utils'
import CategoryEditForm from './form/CategoryEdit.form'

const { buttons } = message.common
interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  parentUID?: string
  uid?: string
}

const CategoryEditContainer = ({ setOpen, parentUID, uid }: Props) => {
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
    </Fragment>
  )
}

export default CategoryEditContainer
