import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { CopySystemDialog } from '../components/copy/CopySystemDialog.comp'
import { useHierarchyStore } from '../store/useHierarchyStore'

export const useSystemCopyPaste = () => {
    const { formatMessage: fm } = useIntl()
    const { copiedSystemUid, setCopiedSystemUid } = useHierarchyStore()
    const { openModal, closeModal } = useDynamicModalStore()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])

    const handleCopySystem = useCallback(
        (uid: string) => {
            setCopiedSystemUid(uid)
        },
        [setCopiedSystemUid],
    )

    const handlePasteSystem = useCallback(
        (destinationUid: string) => {
            if (!copiedSystemUid || destinationUid === copiedSystemUid) return
            openModal('dialog', {
                id: 'copy-system-dialog',
                component: CopySystemDialog,
                props: {
                    title: fm({ id: message.systemHierarchy.copy.dialogTitle }),
                    description: fm({ id: message.systemHierarchy.copy.dialogDescription }),
                    sourceSystemUid: copiedSystemUid,
                    destinationSystemUid: destinationUid,
                    onClose: () => closeModal('copy-system-dialog'),
                },
            })
        },
        [copiedSystemUid, openModal, closeModal, fm],
    )

    return {
        copiedSystemUid,
        canEdit,
        handleCopySystem,
        handlePasteSystem,
    }
}
