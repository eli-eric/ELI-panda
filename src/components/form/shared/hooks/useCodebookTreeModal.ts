import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import { CodebookTreeModalContent } from '../CodebookTreeModal'

export const useCodebookTreeModal = () => {
    const { openModal } = useDynamicModalStore()

    const openCodebookTreeModal = ({
        codebook,
        name,
        title,
        onSubmit,
    }: {
        codebook?: CODEBOOK
        name: string
        title?: string
        onSubmit?: (item?: CodebookType | null) => void
    }) => {
        if (typeof window === 'undefined') return // Prevent SSR execution

        const modalId = openModal('dialog', {
            id: `codebook-tree-${codebook || name}`,
            component: CodebookTreeModalContent,
            props: {
                title,
                codebook,
                name,
                onSelect: onSubmit,
            },
        })

        return modalId
    }

    return { openCodebookTreeModal }
}
