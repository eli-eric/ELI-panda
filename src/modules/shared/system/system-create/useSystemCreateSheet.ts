import { useCallback } from 'react'

import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SystemCreateContainer } from './system-create.cont'
import { useSystemCreateParentStore } from './store/useSystemCreateParentStore'

export const useSystemCreateSheet = () => {
  const { openModal } = useModalGlobalStore()
  const { setParentUid, clear } = useSystemCreateParentStore()

  const openSheetWithParent = useCallback((parentUid?: string) => {
    console.log('🚀 openSheetWithParent called with parentUid:', parentUid)
    clear()
    
    // Only set parentUid in store if we actually have one
    // For root systems, don't set parentUid at all
    if (parentUid) {
      setParentUid(parentUid)
    }
    // If no parentUid, store remains with null (from clear())

    console.log('🎭 Opening modal...')
    openModal('sheet', {
      component: SystemCreateContainer,
      props: {
        size: 'l',
        title: parentUid ? 'Create Subsystem' : 'Create System',
        description: parentUid 
          ? 'Create a new subsystem in the selected parent system'
          : 'Create a new system in the database'
      }
    })
  }, [openModal, setParentUid, clear])

  return openSheetWithParent
}
