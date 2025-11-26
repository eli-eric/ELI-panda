import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { EmptySystemModalContent } from '../components/empty-system-modal-content'

/**
 * Opens empty system selection modal (systems without physical items)
 * Used in order line wizard step 3 for selecting existing systems
 * Automatically handles z-index when opened from nested modals
 */
export const useEmptySystemSelectionModal = () => {
  const { openModal } = useDynamicModalStore()

  const openEmptySystemModal = (
    onSelect?: (
      system: CodebookType | null,
      parent?: CodebookType | null
    ) => void
  ) => {
    const modalId = openModal('dialog', {
      id: 'order-line-empty-system-select',
      component: EmptySystemModalContent,
      props: {
        title: 'Select System (Empty Only)',
        size: 'xl' as const,
        onSelect: onSelect || (() => {})
      }
    })

    return modalId
  }

  return { openEmptySystemModal }
}
