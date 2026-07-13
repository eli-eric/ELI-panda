import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'
import type { SystemLevel } from '@/types/gql/graphql'

import { CreateSubsystemDialog } from '../components/create/CreateSubsystemDialog.comp'
import { guardSystemEdit } from '../utils/guardSystemEdit'

export const useCreateSubsystemAction = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const { openModal, closeModal } = useDynamicModalStore()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])

    const handleCreateSubsystem = useCallback(
        async (parentUid: string, parentName: string, parentLevel: SystemLevel) => {
            // Role is the cheap first-line filter; the per-system check (against the
            // parent) confirms the user is responsible before opening the dialog.
            if (!canEdit) return
            if (!(await guardSystemEdit(queryClient, parentUid, fm))) return

            const modalId = `create-subsystem-${parentUid}`
            const parentLevelLabel = fm({
                id: message.systemHierarchy.systemLevels[parentLevel],
            })
            openModal('dialog', {
                id: modalId,
                component: CreateSubsystemDialog,
                props: {
                    title: fm({ id: message.systemHierarchy.create.dialogTitle }),
                    description: fm(
                        { id: message.systemHierarchy.create.dialogDescription },
                        { parentName, parentLevelLabel },
                    ),
                    size: 'm',
                    parentUid,
                    parentName,
                    parentLevel,
                    onClose: () => closeModal(modalId),
                },
            })
        },
        [canEdit, queryClient, openModal, closeModal, fm],
    )

    return { handleCreateSubsystem }
}
