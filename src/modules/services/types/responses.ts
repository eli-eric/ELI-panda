import type { CodebookType } from '@/types/responses/codebook'

export interface ServiceTypeResponse {
  uid: string
  name: string
  description?: string
  category: CodebookType
  properties?: string[]
}
