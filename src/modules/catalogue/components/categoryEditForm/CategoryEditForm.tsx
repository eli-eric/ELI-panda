import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

import { useCategory } from '../../hooks/useCategory'
import { useCategoryDetail } from '../../hooks/useCategoryDetail'
import { categoryValidationschema } from './CategoryEditForm.schema'
import GroupList from './GroupList'
import Main from './Main'

interface Props {
  uid?: string
  onSubmit: (data: CategoryFormType) => void
  children: React.ReactNode
}

const CategoryEditForm = ({ uid, onSubmit, children }: Props) => {
  const { catalogueCategory } = useCategory()
  const { categoryDetail } = useCategoryDetail(uid)

  const formMethods = useForm<CategoryFormType>({
    defaultValues: !uid
      ? {
          systemType: { uid: catalogueCategory?.systemType?.uid, name: catalogueCategory?.systemType?.name }
        }
      : categoryDetail,
    resolver: yupResolver(categoryValidationschema)
  })

  return (
    <Fragment>
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div className="flex-1">
          <Main uid={uid} />
          <GroupList />
          {children}
        </div>
      </Form>
      <DevTool control={formMethods.control} />
    </Fragment>
  )
}

export default CategoryEditForm
