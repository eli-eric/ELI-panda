import { isFeatureEnabled } from '@/config/featureFlags'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { SpareAssignmentWizardContainer } from './components/spare-assignment-wizard.cont'

interface UseSpareDialogParams {
    systemUid: string
    spareItemUid: string
    onSuccess?: () => void
}

export const useSpareDialog = () => {
    const { openModal } = useDynamicModalStore()

    return ({ systemUid, spareItemUid, onSuccess }: UseSpareDialogParams) => {
        // Feature flag check - spare parts assignment disabled in production
        if (!isFeatureEnabled('enableSparePartsAssignment')) {
            //eslint-disable-next-line
            console.warn('Spare parts assignment is disabled in this environment')
            return
        }

        // Use new dynamic modal system with custom ID
        return openModal('dialog', {
            id: 'spare-assignment-wizard',
            component: SpareAssignmentWizardContainer,
            props: {
                title: 'Assign Spare Part',
                size: 'xl',
                systemUid,
                spareItemUid,
                onSuccess,
            },
        })
    }
}
