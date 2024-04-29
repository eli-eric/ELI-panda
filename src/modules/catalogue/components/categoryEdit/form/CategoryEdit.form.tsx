import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'

import GroupList from './components/GroupList'
import Main from './components/Main'
import { PhysicalItemProperties } from './components/PhysicalItemProperties'
import { useCategory } from '@/modules/catalogue/hooks/useCategory'
import { useCategoryDetail } from '@/modules/catalogue/hooks/useCategoryDetail'
import { categoryValidationschema } from './CategoryEditForm.schema'
import type { CategoryFormType } from '../types'

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
          systemType: {
            uid: catalogueCategory?.systemType?.uid,
            name: catalogueCategory?.systemType?.name
          }
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
          <PhysicalItemProperties />
          {children}
        </div>
      </Form>
    </Fragment>
  )
}

export default CategoryEditForm
