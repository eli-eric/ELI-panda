import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { usePermission } from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'
import type { AxiosError } from '@/types/http'
import { createMessageValues } from '@/utils/formatters'

import { guardSystemEdit } from '../utils/guardSystemEdit'
import { findHierarchyPath } from '../utils/treePath'
import { useDeleteSystem } from './mutations/useDeleteSystem'
import { useSystemDetail } from './queries/useSystemDetail'
import { useSystemHierarchy } from './queries/useSystemHierarchy'
import { useHierarchyNavigation } from './useHierarchyNavigation'

const messages = message.systemHierarchy.delete

const MAX_LISTED_ITEMS = 3

// 409 body contract: the backend returns a BARE array of these at
// `err.response.data` (echo `c.JSON(409, itemsInfo)` where `itemsInfo` is
// `[]models.SystemPhysicalItemInfo` — eli-panda-api
// services/systems-service/systems-handlers.go DeleteSystemRecursive +
// models/model_system.go SystemPhysicalItemInfo). If that shape ever changes,
// buildConflictMessage falls back to the generic message instead of listing items.
type PhysicalItemConflict = {
    systemUid: string
    systemName: string
    itemUid: string
    itemName: string
}

export const useDeleteSystemAction = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])
    const withWarningModal = useWarningModal()
    const { nodes } = useSystemHierarchy()
    const { selectedParentUid, selectedLeafUid, clearSelection } = useHierarchyNavigation()
    const { system: openLeaf } = useSystemDetail(selectedLeafUid)
    const { mutateAsync, isPending } = useDeleteSystem()

    const isOpenOrAncestor = useCallback(
        (uid: string) => {
            // The open node itself — detail leaf or selected tree parent.
            if (uid === selectedLeafUid || uid === selectedParentUid) return true
            // An ancestor of the open detail leaf (its breadcrumb path). The leaf may
            // be opened via selectLeaf with a stale `parent`, so check it directly.
            if (openLeaf?.parentPath?.some(ancestor => ancestor.uid === uid)) return true
            // An ancestor of the selected tree parent.
            return (
                !!selectedParentUid &&
                findHierarchyPath(nodes, selectedParentUid).some(node => node.uid === uid)
            )
        },
        [nodes, selectedParentUid, selectedLeafUid, openLeaf],
    )

    const buildConflictMessage = useCallback(
        (name: string, data: unknown) => {
            const conflicts = Array.isArray(data) ? (data as PhysicalItemConflict[]) : []
            const itemNames = conflicts.map(conflict => conflict.itemName).filter(Boolean)
            if (itemNames.length === 0) {
                return fm({ id: messages.conflictGeneric }, createMessageValues({ name }))
            }
            const shown = itemNames.slice(0, MAX_LISTED_ITEMS).join(', ')
            const remaining = itemNames.length - MAX_LISTED_ITEMS
            // Locale-neutral overflow suffix — avoids embedding an untranslated word.
            const items = remaining > 0 ? `${shown} (+${remaining})` : shown
            return fm({ id: messages.conflict }, createMessageValues({ name, items }))
        },
        [fm],
    )

    const handleDeleteSystem = useCallback(
        async (uid: string, name: string) => {
            if (!canEdit || isPending) return
            // Per-system check-on-click: role-holders who aren't responsible for
            // this node are blocked with a toast before the confirm dialog.
            if (!(await guardSystemEdit(queryClient, uid, fm))) return

            const runDelete = () => {
                toast.promise(mutateAsync({ uid }), {
                    loading: fm({ id: messages.deleting }),
                    success: () => {
                        if (isOpenOrAncestor(uid)) clearSelection()
                        return fm({ id: messages.success }, createMessageValues({ name }))
                    },
                    error: (error: AxiosError) => {
                        if (error?.response?.status === 409) {
                            return buildConflictMessage(name, error.response.data)
                        }
                        return fm({ id: messages.error }, createMessageValues({ name }))
                    },
                })
            }

            const confirm = fm({ id: messages.confirm }, createMessageValues({ name }))
            withWarningModal(runDelete, confirm)()
        },
        [
            canEdit,
            queryClient,
            isPending,
            withWarningModal,
            fm,
            mutateAsync,
            isOpenOrAncestor,
            clearSelection,
            buildConflictMessage,
        ],
    )

    return { canEdit, handleDeleteSystem, isPending }
}
