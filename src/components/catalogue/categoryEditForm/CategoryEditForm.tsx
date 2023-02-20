import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'

import { useEndpoint } from '@/hooks/useEndpoint'
import { CatalogueFormType } from '@/types/catalogue/catalogueTypes'
import { categoryValidationschema } from '@/types/catalogue/constants'

import GroupList from './GroupList'
import Main from './Main'

interface Props {
  uid?: string
  onSubmit: (data: CatalogueFormType) => void
  children: React.ReactNode
}

const CategoryEditForm = ({ uid, onSubmit, children }: Props) => {
  const endpoints = useEndpoint({ uid })

  const { data, error } = useSWR<CatalogueFormType>(
    uid && endpoints.catalogueCategoryEdit,
  )

  const formattedDefaultValues =
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
      : { ...data }

  const formMethods = useForm<CatalogueFormType>({
    defaultValues: formattedDefaultValues,
    resolver: yupResolver(categoryValidationschema),
  })

  return (
    <Fragment>
      <FormProvider {...formMethods}>
        <form className="flex" onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div className="flex-1">
            <Main />
            <GroupList />
            {children}
          </div>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default CategoryEditForm
