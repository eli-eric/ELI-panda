import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SystemCreateContainer } from './system-create.cont'

export const useSystemCreateSheet = ({ uid }: { uid?: string }) => {
  const { openModal } = useModalGlobalStore()

  return () => {
    openModal('sheet', {
      component: SystemCreateContainer,
      props: { size: 'l', title: 'Edit System' },
      onSubmit: (data: any) => {
        console.log('Submit System Edit', data)
      }
    })
  }
}
