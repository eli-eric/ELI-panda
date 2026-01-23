import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { GrantModalContent } from '../components/grant-modal-content'
import type { SelectedGrant } from '../types/grant-select.types'

/**
 * Opens grant selection modal using the dynamic modal system.
 * Automatically handles z-index when opened from nested modals.
 *
 * @example
 * ```tsx
 * const { openGrantModal } = useGrantSelectionModal()
 *
 * const handleAddGrants = () => {
 *   openGrantModal(
 *     (selected) => {
 *       // Handle selected grants
 *       setValue('grants', selected)
 *     },
 *     currentGrants // Pass current selection as initial
 *   )
 * }
 * ```
 */
export const useGrantSelectionModal = () => {
  const { openModal } = useDynamicModalStore()

  const openGrantModal = (
    onSelect: (grants: SelectedGrant[]) => void,
    initialSelected?: SelectedGrant[]
  ) => {
    const modalId = openModal('dialog', {
      id: 'grant-select',
      component: GrantModalContent,
      props: {
        title: 'Select Grants',
        size: 'xl' as const,
        onSelect,
        initialSelected
      }
    })

    return modalId
  }

  return { openGrantModal }
}
