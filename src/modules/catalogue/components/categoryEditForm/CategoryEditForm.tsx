import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Form } from '@/components/form/Form'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

import GroupList from './GroupList'
import Main from './Main'

const categoryValidationschema: yup.ObjectSchema<CategoryFormType> = yup.object().shape({
  name: yup.string().required("Name can't be empty"),
  groups: yup.array().of(
    yup.object().shape({
      uid: yup.string().required("UID can't be empty"),
      name: yup.string().required("Group Name can't be empty"),
      properties: yup.array().of(
        yup.object().shape({
          uid: yup.string().required("UID can't be empty"),
          name: yup.string().required("Property Name can't be empty"),
          type: yup.mixed<CodebookType>().nullable(),
          unit: yup.mixed<CodebookType>().nullable(),
          defaultValue: yup.string().required("Default value can't be empty"),
          listOfValues: yup.lazy((values) =>
            Array.isArray(values)
              ? yup.array().of(
                  yup.object().shape({
                    value: yup.string().required("Value can't be empty"),
                  }),
                )
              : yup.array().of(yup.string().required("Value can't be empty"))
          ),
        }),
      ).required("Properties can't be empty"),
    }),
  ),
  parentUID: yup.string(),
  uid: yup.string(),
  code: yup.string().required("Code can't be empty"),
  image: yup.string(),
});

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
