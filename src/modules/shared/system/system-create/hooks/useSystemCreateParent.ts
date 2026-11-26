import { useSystemDetail } from '@/modules/shared/system/system-detail/hooks/queries/useSystemDetail'

import { useSystemCreateParentStore } from '../store/useSystemCreateParentStore'

/** Parent of the system being created (REST detail) plus its breadcrumb path incl. itself. */
export const useSystemCreateParent = (uid?: string) => {
    const { parentUid } = useSystemCreateParentStore()
    const { system, isLoading, error, refetch } = useSystemDetail(parentUid || uid || null)

    const parentPath = system
        ? [
              ...system.parentPath.map(p => ({
                  uid: p.uid,
                  name: p.name,
                  systemLevel: p.systemLevel,
              })),
              { uid: system.uid, name: system.name, systemLevel: system.systemLevel },
          ]
        : []

    return {
        parentSystem: system,
        parentPath,
        loading: isLoading,
        error,
        refetch,
    }
}
