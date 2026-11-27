import { useCreateSystemDialog } from '@/modules/shared/system/system-create/hooks/useCreateSystemDialog'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'

/**
 * Overview entry to the shared Create System dialog. No navigation: the new row is
 * inserted into the cached tree in place (useCreateSystem) and the Edit System sheet
 * opens so the remaining fields can be filled right away.
 */
export const useCreateSystemFromOverview = () => {
    const openSystemEdit = useSystemEditSheet()
    return useCreateSystemDialog({ onCreated: created => openSystemEdit(created.uid) })
}
