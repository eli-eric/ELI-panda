import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { PlusButton } from '@/components/Buttons'
import { BreadcrumbItem, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import CategoryEditContainer from '../CategoryEdit.cont'

let currentAddCategoryModalId: string | undefined

export const AddCategoryButton = () => {
    const { formatMessage: fm } = useIntl()
    const parentUID = useCategoryUid()
    const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
    const openModal = useDynamicModalStore(state => state.openModal)

    if (!canEdit) return null

    const handleOpenSheet = () => {
        currentAddCategoryModalId = openModal('sheet', {
            id: `category-add-${parentUID || 'root'}`,
            component: () => (
                <CategoryEditContainer
                    parentUID={parentUID}
                    setOpen={() => {}}
                    modalId={currentAddCategoryModalId}
                />
            ),
            props: {
                title: fm({ id: message.catalogue.category.addNew }),
            },
            onClose: undefined,
            onSubmit: undefined,
            parentTriggerFn: undefined,
        })
        return currentAddCategoryModalId
    }

    return (
        <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <PlusButton onClick={handleOpenSheet} />
            </BreadcrumbItem>
        </Fragment>
    )
}
