import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import type { CodebookType } from '@/types/responses/codebook'

import type { CategoryFormType } from '../types'
import { categoryValidationschema } from './CategoryEditForm.schema'
import GroupList from './components/GroupList'
import Main from './components/Main'
import { PhysicalItemProperties } from './components/PhysicalItemProperties'

interface Props {
  uid?: string
  onSubmit: (data: CategoryFormType) => void
  children: (
    withDirtyProtection: (callback: () => void) => () => void
  ) => React.ReactNode
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
    resolver: yupResolver(categoryValidationschema),
    mode: 'onChange'
  })

  const { withDirtyProtection } = useFormDirtyProtection(formMethods)
  const { setIsDirty, reset } = useModalFormStateStore()

  useEffect(() => {
    setIsDirty(formMethods.formState.isDirty)
  }, [formMethods.formState.isDirty, setIsDirty])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <div className="space-y-6">
        {/* Action Buttons */}
        {children(withDirtyProtection)}

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Main uid={uid} imageRef={imageRef} />
          </CardContent>
        </Card>

        {/* Property Groups */}
        <Card>
          <CardHeader>
            <CardTitle>Property Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <GroupList />
          </CardContent>
        </Card>

        {/* Physical Item Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Physical Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <PhysicalItemProperties />
          </CardContent>
        </Card>
      </div>
    </Form>
  )
}

export default CategoryEditForm
