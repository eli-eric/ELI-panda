import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookTreeModalContent } from '../CodebookTreeModal'

export const useCodebookTreeModal = () => {
  const { openModal } = useModalGlobalStore()

  const openCodebookTreeModal = ({
    codebook,
    name,
    title,
    onSubmit
  }: {
    codebook?: CODEBOOK
    name: string
    title?: string
    onSubmit?: (item?: CodebookType | null) => void
  }) => {
    if (typeof window === 'undefined') return // Prevent SSR execution

    openModal('dialog1', {
      component: CodebookTreeModalContent,
      props: {
        title,
        codebook,
        name,
        onSelect: onSubmit
      }
    })
  }

  return { openCodebookTreeModal }
}

