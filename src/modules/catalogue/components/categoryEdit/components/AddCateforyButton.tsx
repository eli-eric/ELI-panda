import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { BreadcrumbItem, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import usePermission from '@/hooks/usePermission'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'

import CategoryEditContainer from '../CategoryEdit.cont'

export const AddCategoryButton = () => {
  const parentUID = useCategoryUid()
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const openModal = useModalGlobalStore(state => state.openModal)

  if (!canEdit) return null

  const handleOpenSheet = () => {
    openModal('sheet', {
      component: CategoryEditContainer,
      props: {
        parentUID,
        setOpen: () => {}, // No-op, handled by global store
        title: 'Add New Category'
      },
      onClose: undefined,
      onSubmit: undefined,
      parentTriggerFn: undefined
    })
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
