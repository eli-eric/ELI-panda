import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { SystemModalContent } from '../components/system-modal-content'

export const useSystemSelectionModal = () => {
  const { openModal } = useModalGlobalStore()

  const openSystemModal = (
    onSelect?: (system: CodebookType | null) => void
  ) => {
    openModal('dialog2', {
      component: SystemModalContent,
      props: {
        title: 'Select System',
        size: 'xl' as const,
        onSelect: onSelect || (() => {})
      }
    })
  }

  return { openSystemModal }
}
