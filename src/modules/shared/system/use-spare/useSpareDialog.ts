import { isFeatureEnabled } from '@/config/featureFlags'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { SpareAssignmentWizardContainer } from './components/spare-assignment-wizard.cont'

interface UseSpareDialogParams {
  systemUid: string
  spareItemUid: string
  onSuccess?: () => void
}

export const useSpareDialog = () => {
  const { openModal } = useModalGlobalStore()

  return ({ systemUid, spareItemUid, onSuccess }: UseSpareDialogParams) => {
    // Feature flag check - spare parts assignment disabled in production
    if (!isFeatureEnabled('enableSparePartsAssignment')) {
      //eslint-disable-next-line
      console.warn('Spare parts assignment is disabled in this environment')
      return
    }

    return openModal('dialog2', {
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
}
