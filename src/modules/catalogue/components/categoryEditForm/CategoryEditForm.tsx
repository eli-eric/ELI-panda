import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Form } from '@/components/form/Form'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

import GroupList from './GroupList'
import Main from './Main'

const categoryValidationschema = yup.object().shape({
  name: yup.string().required("Name can't be empty"),
  groups: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Group Name can't be empty"),
      properties: yup.array().of(
        yup.object().shape({
          name: yup.string().required("Property Name can't be empty"),
          type: yup.object().nullable().required('Property Type is required'),
          unit: yup.object().nullable(),
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

  //useFormNotification<CategoryFormType>({ control: formMethods.control })

  return (
    <Fragment>
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div className="flex-1">
          <Main uid={uid} />
          <GroupList />
          {children}
        </div>
      </Form>
    </Fragment>
  )
}

export default CategoryEditForm
