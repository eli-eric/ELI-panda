import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import type { SystemDetail } from '@/modules/shared/system/system-detail/types'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'

import { CreateSystemDialog, type CreateSystemParent } from '../components/CreateSystemDialog.comp'

interface UseCreateSystemDialogOptions {
    onCreated?: (created: SystemDetail) => void
}

/**
 * Opens the shared Create System dialog — a root system without `parent`, a child with it.
 * Role is the hard gate; responsibility for the PARENT (the new HAS_SUBSYSTEM edge) is the
 * soft lock, confirmed before the dialog opens.
 */
export const useCreateSystemDialog = ({ onCreated }: UseCreateSystemDialogOptions = {}) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const { openModal, closeModal } = useDynamicModalStore()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])

    const getDescription = useCallback(
        (parent: CreateSystemParent) =>
            parent.level
                ? fm(
                      { id: message.systemHierarchy.create.dialogDescription },
                      {
                          parentName: parent.name,
                          parentLevelLabel: fm({
                              id: message.systemHierarchy.systemLevels[parent.level],
                          }),
                      },
                  )
                : fm(
                      { id: message.systemHierarchy.create.dialogDescriptionNoLevel },
                      { parentName: parent.name },
                  ),
        [fm],
    )

    return useCallback(
        async (parent?: CreateSystemParent | null) => {
            if (!canEdit) return
            if (parent && !(await confirmSystemEdit(queryClient, parent.uid, fm))) return

            const modalId = parent ? `create-system-${parent.uid}` : 'create-system-root'
            openModal('dialog', {
                id: modalId,
                component: CreateSystemDialog,
                props: {
                    title: fm({ id: message.systemHierarchy.create.dialogTitle }),
                    description: parent
                        ? getDescription(parent)
                        : fm({ id: message.systemHierarchy.create.rootDialogDescription }),
                    size: 'm',
                    parent: parent ?? null,
                    onCreated,
                    onClose: () => closeModal(modalId),
                },
            })
        },
        [canEdit, queryClient, fm, openModal, closeModal, getDescription, onCreated],
    )
}
