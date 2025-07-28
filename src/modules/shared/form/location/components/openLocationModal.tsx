import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookTreeModalGraphqlContent } from './location-modal-content'
interface CodebookTreeModalProps {
  loading?: boolean
  enableFiltering?: boolean
  name?: string
  tableId?: string
  selectParent?: boolean
  manualFiltering?: boolean
  onSelect: (item: CodebookType | null) => void
}
export function openCodebookTreeModalGraphql(props: CodebookTreeModalProps) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  console.log('openCodebookTreeModalGraphql called with props:', props)
  console.log('onSelect function exists:', typeof props.onSelect === 'function')

  const { openModal } = useModalGlobalStore.getState()
  openModal('dialog2', {
    component: CodebookTreeModalGraphqlContent,
    props: {
      ...props,
      size: 'l'
    },
    onClose:
      typeof props.onSelect === 'function'
        ? () => {
            console.log(
              'Modal onClose called, calling props.onSelect with null'
            )
            props.onSelect?.(null)
          }
        : undefined
  })
}
