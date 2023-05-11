import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR from 'swr'
import * as yup from 'yup'

import { useEndpoint } from '@/hooks/useEndpoint'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

import GroupList from './GroupList'
import Main from './Main'

const categoryValidationschema = yup.object().shape({
  name: yup.string().required(),
  groups: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      properties: yup.array().of(
        yup.object().shape({
          name: yup.string().required(),
          typeUID: yup.string().required(),
          unitUID: yup.string(),
          defaultValue: yup.string(),
          listOfValues: yup.array().of(
            yup.object({
              value: yup.string().required()
            })
          )
        })
      )
    })
  )
})

interface Props {
  uid?: string
  onSubmit: (data: CategoryFormType) => void
  children: React.ReactNode
}

const CategoryEditForm = ({ uid, onSubmit, children }: Props) => {
  const endpoints = useEndpoint({ uid })

  const { data } = useSWR<CategoryFormType>(uid && endpoints.catalogueCategoryEdit)

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
                  value: value
                }))
              }))
            }))
          }
        : { ...data },
    [data]
  )

  const formMethods = useForm<CategoryFormType>({
    defaultValues: formattedDefaultValues,
    resolver: yupResolver(categoryValidationschema),
    mode: 'onSubmit'
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
