import { useQueryState } from 'next-usequerystate'

import type { CodebookType } from '@/types/responses/codebook'

export const useCategoryUid = () => {
    const [categoryQuery] = useQueryState('category', { history: 'push' })
    if (!categoryQuery) return undefined

    try {
        const category: CodebookType | null = JSON.parse(categoryQuery)
        return category?.uid
    } catch {
        // Malformed URL state — treat as absent rather than crashing render
        return undefined
    }
}
