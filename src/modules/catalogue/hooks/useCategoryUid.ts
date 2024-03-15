import { useQueryState } from 'next-usequerystate'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

export const useCategoryUid = () => {
  const [categoryQuery] = useQueryState('category', { history: 'push' })
  const category: CodebookType | null = categoryQuery ? JSON.parse(categoryQuery) : null

  return category?.uid
}
