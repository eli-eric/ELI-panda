import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

import type { CategoryFormType } from '../types'
import { categoryValidationschema } from './CategoryEditForm.schema'
import GroupList from './components/GroupList'
import Main from './components/Main'
import { PhysicalItemProperties } from './components/PhysicalItemProperties'

interface Props {
  uid?: string
  onSubmit: (data: CategoryFormType) => void
  onExit: () => void
  systemType?: CodebookType
  categoryDetail: CategoryFormType
  imageRef?: React.MutableRefObject<ImageGalleryRef | null>
  loading?: boolean
}

const CategoryEditForm = ({
  uid,
  onSubmit,
  onExit,
  systemType,
  categoryDetail,
  imageRef,
  loading
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

  const { handleSubmit } = formMethods
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
    <Form formMethods={formMethods}>
      <div className="space-y-6">
        <SheetFormButtons
          onSubmit={handleSubmit(onSubmit)}
          onExit={withDirtyProtection(() => onExit())}
          editRole={ROLE.CATALOGUE_EDIT}
          loading={loading}
          isFormDirty={formMethods.formState.isDirty}
        />

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
