import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { SystemTypeModalContent } from '../components/system-type-modal-content'

export const useSystemTypeSelectionModal = () => {
  const { openModal } = useDynamicModalStore()

  const openSystemTypeModal = (
    onSelect?: (systemType: CodebookType | null) => void
  ) => {
    const modalId = openModal('dialog', {
      id: 'system-type-select',
      component: SystemTypeModalContent,
      props: {
        title: 'Select System Type',
        size: 'l' as const,
        enableFiltering: true,
        manualFiltering: false,
        selectParent: false,
        onSelect: onSelect || (() => {})
      }
    })

    return modalId
  }

  return { openSystemTypeModal }
}
