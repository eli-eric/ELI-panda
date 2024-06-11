import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import type { CodebookType } from '@/types/responses/codebook'

import type { CategoryFormType } from '../types'
import { categoryValidationschema } from './CategoryEditForm.schema'
import GroupList from './components/GroupList'
import Main from './components/Main'
import { PhysicalItemProperties } from './components/PhysicalItemProperties'

interface Props {
  uid?: string
  onSubmit: (data: CategoryFormType) => void
  children: React.ReactNode
  systemType?: CodebookType
  categoryDetail: CategoryFormType
  imageRef?: React.MutableRefObject<ImageGalleryRef | null>
}

const CategoryEditForm = ({
  uid,
  onSubmit,
  children,
  systemType,
  categoryDetail,
  imageRef
}: Props) => {
  const formMethods = useForm<CategoryFormType>({
    defaultValues: !uid
      ? {
          systemType
        }
      : categoryDetail,
    resolver: yupResolver(categoryValidationschema)
  })

  return (
    <Fragment>
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div className="flex-1">
          <Main uid={uid} imageRef={imageRef} />
          <GroupList />
          <PhysicalItemProperties />
          {children}
        </div>
      </Form>
    </Fragment>
  )
}

export default CategoryEditForm
