import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { SystemModalContent } from '../components/system-modal-content'

/**
 * Opens system selection modal using new dynamic modal system
 * Automatically handles z-index when opened from nested modals
 */
export const useSystemSelectionModal = () => {
  const { openModal } = useDynamicModalStore()

  const openSystemModal = (
    onSelect?: (system: CodebookType | null) => void
  ) => {
    // Use custom ID for consistent modal management
    const modalId = openModal('dialog', {
      id: 'system-select',
      component: SystemModalContent,
      props: {
        title: 'Select System',
        size: 'xl' as const,
        onSelect: onSelect || (() => {})
      }
    })

    return modalId
  }

  return { openSystemModal }
}
