import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'
import type { SystemLevel } from '@/types/gql/graphql'

import { CreateSubsystemDialog } from '../components/create/CreateSubsystemDialog.comp'

export const useCreateSubsystemAction = () => {
    const { formatMessage: fm } = useIntl()
    const { openModal, closeModal } = useDynamicModalStore()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])

    const handleCreateSubsystem = useCallback(
        (parentUid: string, parentName: string, parentLevel: SystemLevel) => {
            const modalId = `create-subsystem-${parentUid}`
            openModal('dialog', {
                id: modalId,
                component: CreateSubsystemDialog,
                props: {
                    title: fm({ id: message.systemHierarchy.create.dialogTitle }),
                    description: fm(
                        { id: message.systemHierarchy.create.dialogDescription },
                        { parentName },
                    ),
                    size: 'm',
                    parentUid,
                    parentName,
                    parentLevel,
                    onClose: () => closeModal(modalId),
                },
            })
        },
        [openModal, closeModal, fm],
    )

    return { canEdit, handleCreateSubsystem }
}
