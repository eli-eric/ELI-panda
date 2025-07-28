import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookTreeModalGraphqlContent } from '../components/location-modal-content'

export const useLocationSelectionModal = () => {
  const { openModal } = useModalGlobalStore()

  const openLocationModal = (
    onSelect?: (location: CodebookType | null) => void
  ) => {
    openModal('dialog2', {
      component: CodebookTreeModalGraphqlContent,
      props: {
        title: 'Select Location',
        size: 'l' as const,
        enableFiltering: true,
        manualFiltering: true,
        onSelect: onSelect || (() => {})
      }
    })
  }

  return { openLocationModal }
}
