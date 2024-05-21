import { useQueryState } from 'next-usequerystate'

import type { CodebookType } from '@/types/responses/codebook'

export const useCategoryUid = () => {
  const [categoryQuery] = useQueryState('category', { history: 'push' })
  const category: CodebookType | null = categoryQuery
    ? JSON.parse(categoryQuery)
    : null

  return category?.uid
}
