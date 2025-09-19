import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
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
  children?: React.ReactNode
  systemType?: CodebookType
  categoryDetail: CategoryFormType
  imageRef?: React.MutableRefObject<ImageGalleryRef | null>
}

const CategoryEditForm = ({
  uid,
  onSubmit,
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

  const { handleSubmit } = formMethods
  const { closeModal } = useModalGlobalStore()

  return (
    <Form formMethods={formMethods}>
      <SheetFormButtons
        editRole={ROLE.CATALOGUE_EDIT}
        isFormDirty={formMethods.formState.isDirty}
        onSubmit={handleSubmit(onSubmit)}
        onExit={() => {
          {
            closeModal('sheet')
          }
        }}
        saveLabel="Save Category"
        loadingText="Saving category..."
      />
      <div className="space-y-6">
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

        {/* Action Buttons */}
      </div>
    </Form>
  )
}

export default CategoryEditForm
