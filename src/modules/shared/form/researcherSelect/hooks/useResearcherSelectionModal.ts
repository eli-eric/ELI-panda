import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ResearcherModalContent } from '../components/researcher-modal-content'
import type { SelectedResearcher } from '../types/researcher-select.types'

/**
 * Opens researcher selection modal using the dynamic modal system.
 * Automatically handles z-index when opened from nested modals.
 *
 * @example
 * ```tsx
 * const { openResearcherModal } = useResearcherSelectionModal()
 *
 * const handleAddAuthors = () => {
 *   openResearcherModal(
 *     (selected) => {
 *       // Handle selected researchers
 *       setValue('eliResearchers', selected)
 *     },
 *     currentResearchers // Pass current selection as initial
 *   )
 * }
 * ```
 */
export const useResearcherSelectionModal = () => {
  const { openModal } = useDynamicModalStore()

  const openResearcherModal = (
    onSelect: (researchers: SelectedResearcher[]) => void,
    initialSelected?: SelectedResearcher[]
  ) => {
    const modalId = openModal('dialog', {
      id: 'researcher-select',
      component: ResearcherModalContent,
      props: {
        title: 'Select ELI Authors',
        size: 'xl' as const,
        onSelect,
        initialSelected
      }
    })

    return modalId
  }

  return { openResearcherModal }
}
