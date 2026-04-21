import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { QuickCreateCategoryModal } from '../components/create/QuickCreateCategoryModal.comp'
import { QuickCreateItemModal } from '../components/create/QuickCreateItemModal.comp'
import { useCatalogueCategoryCopy } from './mutations/useCatalogueCategoryCopy'
import { useCatalogueCategoryDelete } from './mutations/useCatalogueCategoryDelete'
import { useCatalogueNavigation } from './useCatalogueNavigation'

export const useCategoryContextActions = () => {
    const { formatMessage: fm } = useIntl()
    const canEditCategory = !!usePermission([ROLE.CATALOGUE_CATEGORY_EDIT])
    const canEditItem = !!usePermission([ROLE.CATALOGUE_EDIT])

    const { openModal, closeModal } = useDynamicModalStore()
    const { openCategoryDetail, selectItem, selectedCategoryUid, backToTable } =
        useCatalogueNavigation()
    const withWarning = useWarningModal()
    const { copyCategory } = useCatalogueCategoryCopy()
    const { deleteCategory } = useCatalogueCategoryDelete()

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
            const run = (id: string) => {
                void copyCategory(id).then(newUid => {
                    if (newUid) openCategoryDetail(newUid)
                })
            }
            withWarning(run, fm({ id: message.catalogue.category.confirmCopy }))(uid)
        },
        [canEditCategory, copyCategory, openCategoryDetail, withWarning, fm],
    )

    const handleDeleteCategory = useCallback(
        (uid: string) => {
            if (!canEditCategory) return
            const run = (id: string) => {
                void deleteCategory(id).then(() => {
                    if (selectedCategoryUid === id) backToTable()
                })
            }
            withWarning(run, fm({ id: message.catalogue.category.confirmDelete }))(uid)
        },
        [canEditCategory, deleteCategory, selectedCategoryUid, backToTable, withWarning, fm],
    )

    return {
        canEditCategory,
        canEditItem,
        handleCreateSubCategory,
        handleCreateItem,
        handleEditCategory,
        handleCopyCategory,
        handleDeleteCategory,
    }
}
