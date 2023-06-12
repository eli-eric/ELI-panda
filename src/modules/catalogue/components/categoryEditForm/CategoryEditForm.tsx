import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
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
          type: yup.object().required(),
          unit: yup.object(),
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

  const { response } = useFetch<CategoryFormType>({
    url: uid && endpoints.catalogueCategoryEdit,
    format: data =>
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
        : { ...data }
  })

  const formMethods = useForm<CategoryFormType>({
    defaultValues: response,
    resolver: yupResolver(categoryValidationschema)
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
      <DevTool control={formMethods.control} />
    </Fragment>
  )
}

export default CategoryEditForm
