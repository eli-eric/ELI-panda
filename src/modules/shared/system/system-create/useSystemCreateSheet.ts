import { useCallback } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemCreateParentStore } from './store/useSystemCreateParentStore'
import { SystemCreateContainer } from './system-create.cont'

export const useSystemCreateSheet = () => {
  const { openModal } = useDynamicModalStore()
  const { setParentUid, clear } = useSystemCreateParentStore()

  const openSheetWithParent = useCallback(
    (parentUid?: string) => {
      clear()

      // Only set parentUid in store if we actually have one
      // For root systems, don't set parentUid at all
      if (parentUid) {
        setParentUid(parentUid)
      }
      // If no parentUid, store remains with null (from clear())

      const modalId = openModal('sheet', {
        id: 'system-create',
        component: SystemCreateContainer,
        props: {
          size: 'l',
          title: parentUid ? 'Create Subsystem' : 'Create System',
          description: parentUid
            ? 'Create a new subsystem in the selected parent system'
            : 'Create a new system in the database'
        }
      })

      return modalId
    },
    [openModal, setParentUid, clear]
  )

  return openSheetWithParent
}
