import { useCodebook } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'

export const useCodebookValues = (codebookType: CODEBOOK | null) => {
  return useCodebook(codebookType as CODEBOOK, {
    limit: 5000
  })
}
