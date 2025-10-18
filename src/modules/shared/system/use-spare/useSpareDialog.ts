import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SpareAssignmentWizardContainer } from './components/spare-assignment-wizard.cont'

interface UseSpareDialogParams {
  systemUid: string
  spareItemUid: string
  onSuccess?: () => void
}

export const useSpareDialog = () => {
  const { openModal } = useModalGlobalStore()

  return ({ systemUid, spareItemUid, onSuccess }: UseSpareDialogParams) =>
    openModal('dialog2', {
      component: SpareAssignmentWizardContainer,
      props: {
        title: 'Assign Spare Part',
        size: 'xl',
        systemUid,
        spareItemUid,
        onSuccess
      }
    })
}
