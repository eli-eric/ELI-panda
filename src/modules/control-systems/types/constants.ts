import type { CodebookFilter } from '@/types/responses/codebook'

export const ONLY_ROOT_ZONES: CodebookFilter[] = [{ key: 'onlyRootElements', value: true }] as const

export const BATCH_LIMIT = 25 as const
