import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { usePermission } from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { QuickCreateCategoryModal } from '../components/create/QuickCreateCategoryModal.comp'
import { QuickCreateItemModal } from '../components/create/QuickCreateItemModal.comp'
import { useCatalogueTreeStore } from '../store/useCatalogueTreeStore'
import { useCatalogueNavigation } from './useCatalogueNavigation'

export const useCategoryContextActions = () => {
    const { formatMessage: fm } = useIntl()
    const canEditCategory = !!usePermission([ROLE.CATALOGUE_CATEGORY_EDIT])
    const canEditItem = !!usePermission([ROLE.CATALOGUE_EDIT])

    const { openModal, closeModal } = useDynamicModalStore()
    const { openCategoryDetail, selectItem } = useCatalogueNavigation()
    const { copiedCategoryUid, setCopiedCategoryUid } = useCatalogueTreeStore()
    const withWarning = useWarningModal()

    const handleCreateSubCategory = useCallback(
        (parentUid: string) => {
            if (!canEditCategory) return
            const modalId = `quick-create-category-${parentUid}`
            openModal('dialog', {
                id: modalId,
                component: QuickCreateCategoryModal,
                props: {
                    open: true,
                    parentUid,
                    onClose: () => closeModal(modalId),
                    onCreated: (newUid: string) => {
                        openCategoryDetail(newUid)
                    },
                },
            })
        },
        [canEditCategory, openModal, closeModal, openCategoryDetail],
    )

    const handleCreateItem = useCallback(
        (categoryUid: string, categoryName?: string) => {
            if (!canEditItem) return
            const modalId = `quick-create-item-${categoryUid}`
            openModal('dialog', {
                id: modalId,
                component: QuickCreateItemModal,
                props: {
                    open: true,
                    categoryUid,
                    categoryName,
                    onClose: () => closeModal(modalId),
                    onCreated: (newUid: string) => {
                        selectItem(newUid)
                    },
                },
            })
        },
        [canEditItem, openModal, closeModal, selectItem],
    )

    const handleEditCategory = useCallback(
        (uid: string) => {
            openCategoryDetail(uid)
        },
        [openCategoryDetail],
    )

    const handleCopyCategory = useCallback(
        (uid: string) => {
            if (!canEditCategory) return
            setCopiedCategoryUid(uid)
            toast.success(fm({ id: message.catalogue.category.copy }))
        },
        [canEditCategory, setCopiedCategoryUid, fm],
    )

    const handlePasteCategory = useCallback(
        (_targetUid: string) => {
            if (!canEditCategory || !copiedCategoryUid) return
            toast.info('Paste action: backend copy flow pending implementation')
        },
        [canEditCategory, copiedCategoryUid],
    )

    const handleDeleteCategory = useCallback(
        (uid: string) => {
            if (!canEditCategory) return
            const confirm = withWarning(
                (_u: string) => {
                    void _u
                    toast.info('Delete action: backend wiring pending')
                },
                fm({ id: message.catalogue.category.confirmDelete }),
            )
            confirm(uid)
        },
        [canEditCategory, withWarning, fm],
    )

    return {
        canEditCategory,
        canEditItem,
        copiedCategoryUid,
        handleCreateSubCategory,
        handleCreateItem,
        handleEditCategory,
        handleCopyCategory,
        handlePasteCategory,
        handleDeleteCategory,
    }
}
