import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SystemCreateContainer } from './system-create.cont'

export const useSystemCreateSheet = () => {
  const { openModal } = useModalGlobalStore()

  return () => {
    openModal('sheet', {
      component: SystemCreateContainer,
      props: { 
        size: 'l', 
        title: 'Create System',
        description: 'Create a new system in the database'
      }
    })
  }
}
