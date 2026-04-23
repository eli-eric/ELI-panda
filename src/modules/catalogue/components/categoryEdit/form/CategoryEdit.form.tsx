import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
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
    modalId?: string
}

const CategoryEditForm = ({
    uid,
    onSubmit,
    systemType,
    categoryDetail,
    imageRef,
    modalId,
}: Props) => {
    const formMethods = useForm<CategoryFormType>({
        values: uid ? categoryDetail : undefined,
        defaultValues: !uid ? { systemType } : undefined,
        resolver: yupResolver(categoryValidationschema),
        resetOptions: { keepDirtyValues: true },
    })

    const { handleSubmit } = formMethods
    const { formatMessage: fm } = useIntl()
    const { closeModal } = useDynamicModalStore()

    return (
        <Form formMethods={formMethods}>
            <SheetFormButtons
                editRole={ROLE.CATALOGUE_EDIT}
                isFormDirty={formMethods.formState.isDirty}
                onSubmit={handleSubmit(onSubmit)}
                onExit={() => {
                    if (modalId) {
                        closeModal(modalId)
                    }
                }}
                saveLabel={fm({ id: message.catalogue.category.save })}
                loadingText={fm({ id: message.catalogue.category.saving })}
            />
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {fm({ id: message.catalogue.category.basicInformation })}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Main uid={uid} imageRef={imageRef} />
                    </CardContent>
                </Card>

                {/* Property Groups */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {fm({ id: message.catalogue.category.propertyGroups })}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GroupList />
                    </CardContent>
                </Card>

                {/* Physical Item Properties */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {fm({ id: message.catalogue.category.physicalProperties })}
                        </CardTitle>
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
