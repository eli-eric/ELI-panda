import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { SystemTypeModalContent } from '../components/system-type-modal-content'

export const useSystemTypeSelectionModal = () => {
  const { openModal } = useModalGlobalStore()

  const openSystemTypeModal = (
    onSelect?: (systemType: CodebookType | null) => void
  ) => {
    openModal('dialog2', {
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
  }

  return { openSystemTypeModal }
}