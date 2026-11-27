import { useCallback } from 'react'

import { useCreateSystemDialog } from '@/modules/shared/system/system-create/hooks/useCreateSystemDialog'
import type { SystemLevel } from '@/types/constants/systemLevel'

import { useHierarchyNavigation } from './useHierarchyNavigation'

/** Explorer entry to the shared Create System dialog: the new system becomes the open detail. */
export const useCreateSubsystemAction = () => {
    const { selectLeaf } = useHierarchyNavigation()
    const openCreateSystem = useCreateSystemDialog({
        onCreated: created => selectLeaf(created.uid),
    })

    const handleCreateSubsystem = useCallback(
        (parentUid: string, parentName: string, parentLevel: SystemLevel) =>
            openCreateSystem({ uid: parentUid, name: parentName, level: parentLevel }),
        [openCreateSystem],
    )

    return { handleCreateSubsystem }
}
