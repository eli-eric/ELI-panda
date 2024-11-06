import type { CodebookType } from '@/types/responses/codebook'

export type ItemMovePost = {
  condition: CodebookType | null
  deleteSourceSystem: boolean
  destinationSystemUid: string | null
  itemUsage: CodebookType | null
  location: CodebookType | null
  parentSystemUid: string | null
  sourceSystemUid: string
  systemName: string
}

export type SystemFileCopy = {
  sourceUid: string
  destinationUid: string
}
