import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SystemEditContainer } from './system-edit.cont'

export const useSystemEdit = ({ uid }: { uid: string }) => {
  const { openModal } = useModalGlobalStore()

  return () => {
    openModal('sheet', {
      component: SystemEditContainer,
      props: { uid, size: 'm', title: 'Edit System' },
      onSubmit: (data: any) => {
        console.log('Submit System Edit', data)
      }
    })
  }
}
