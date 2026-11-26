import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'
import type { SystemLevel } from '@/types/constants/systemLevel'

import { CreateSubsystemDialog } from '../components/create/CreateSubsystemDialog.comp'

export const useCreateSubsystemAction = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const { openModal, closeModal } = useDynamicModalStore()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])

    const handleCreateSubsystem = useCallback(
        async (parentUid: string, parentName: string, parentLevel: SystemLevel) => {
            // Role is the hard gate; responsibility for the PARENT (the new
            // HAS_SUBSYSTEM edge) is the soft lock, confirmed before the dialog opens.
            if (!canEdit) return
            if (!(await confirmSystemEdit(queryClient, parentUid, fm))) return

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
