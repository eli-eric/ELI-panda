import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import { useEndpoint } from '@/hooks/useEndpoint'
import { CategoryFormType } from '@/types/catalogue/categoryFormTypes'
import { categoryValidationschema } from '@/types/catalogue/constants'

import GroupList from './GroupList'
import Main from './Main'

interface Props {
  uid?: string
  onSubmit: (data: CategoryFormType) => void
  children: React.ReactNode
}

const CategoryEditForm = ({ uid, onSubmit, children }: Props) => {
  const endpoints = useEndpoint({ uid })

  const { data } = useSWR<CategoryFormType>(
    uid && endpoints.catalogueCategoryEdit,
  )

  const formattedDefaultValues = useMemo(
    () =>
      data?.groups && data.groups.length !== 0
        ? {
            ...data,
            groups: data.groups?.map(group => ({
              ...group,
              properties: group.properties.map(property => ({
                ...property,
                listOfValues: property.listOfValues?.map(value => ({
                  value: value,
                })),
              })),
            })),
          }
        : { ...data },
    [data],
  )

  const formMethods = useForm<CategoryFormType>({
    defaultValues: formattedDefaultValues,
    resolver: yupResolver(categoryValidationschema),
  })

  return (
    <Fragment>
      <FormProvider {...formMethods}>
        <form className="flex" onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="flex-1">
            <Main uid={uid} />
            <GroupList />
            {children}
          </div>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default CategoryEditForm
