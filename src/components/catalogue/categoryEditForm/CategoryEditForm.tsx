import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CatalogueFormType } from '@/types/catalogue/catalogueTypes'
import { categoryValidationschema } from '@/types/catalogue/constants'

import GroupList from './GroupList'
import Main from './Main'

interface Props {
  setopen: Dispatch<SetStateAction<boolean>>
  defaultValues?: CatalogueFormType
}

const CategoryEditForm = ({ setopen, defaultValues }: Props) => {
  const formMethods = useForm<CatalogueFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(categoryValidationschema),
  })
  const onSubmit = (data: CatalogueFormType) => {
    const formattedData =
      data.groups && data.groups.length !== 0
        ? {
            ...data,
            groups: data.groups?.map(group => ({
              ...group,
              properties: group.properties?.map(prop =>
                prop.listOfValues && prop.listOfValues.length !== 0
                  ? {
                      ...prop,
                      listOfValues: prop.listOfValues.map(value => value.value),
                    }
                  : { ...prop },
              ),
            })),
          }
        : { ...data }
    console.log(formattedData)
    setopen(false)
  }

  return (
    <FormProvider {...formMethods}>
      <form className="flex" onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex-1">
          <Main />
          <GroupList />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              data-testid={'-modal-button-go-next'}
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              Save
            </button>
            <button
              data-testid="modal-button-go-back"
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
              onClick={() => {
                setopen(false)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default CategoryEditForm
