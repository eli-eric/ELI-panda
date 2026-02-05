import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookTreeModalGraphqlContent } from '../components/location-modal-content'

/**
 * Opens location selection modal using new dynamic modal system
 * Automatically handles z-index when opened from nested modals
 */
export const useLocationSelectionModal = () => {
    const { openModal } = useDynamicModalStore()

    const openLocationModal = (onSelect?: (location: CodebookType | null) => void) => {
        // Use custom ID for consistent modal management
        const modalId = openModal('dialog', {
            id: 'location-select',
            component: CodebookTreeModalGraphqlContent,
            props: {
                title: 'Select Location',
                size: 'l' as const,
                enableFiltering: true,
                manualFiltering: true,
                selectParent: true,
                onSelect: onSelect || (() => {}),
            },
        })

        return modalId
    }

    return { openLocationModal }
}
