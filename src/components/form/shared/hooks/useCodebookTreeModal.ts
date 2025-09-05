import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookTreeModalContent } from '../CodebookTreeModal'

export const useCodebookTreeModal = () => {
  const { openModal } = useModalGlobalStore()

  const openCodebookTreeModal = ({
    codebook,
    name,
    onSubmit
  }: {
    codebook?: CODEBOOK
    name: string
    onSubmit?: (item?: CodebookType | null) => void
  }) => {
    if (typeof window === 'undefined') return // Prevent SSR execution

    openModal('dialog1', {
      component: CodebookTreeModalContent,
      props: {
        codebook,
        name
      },
      onSubmit: onSubmit
    })
  }

  return { openCodebookTreeModal }
}

