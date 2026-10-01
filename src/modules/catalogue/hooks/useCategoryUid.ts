import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import type { CodebookType } from '@/types/responses/codebook'
import { parseJsonParam } from '@/utils/urlQuery'

export const useCategoryUid = () => {
    const [categoryQuery] = useUrlQueryState('category', { history: 'push' })

    // Malformed URL state — treat as absent rather than crashing render
    return parseJsonParam<CodebookType | null>(categoryQuery, null)?.uid
}
