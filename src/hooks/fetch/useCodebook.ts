import useSWR from 'swr/immutable'

import type { CODEBOOK } from '@/types/constants/codebook'
import { fetcher } from '@/utils/fetcher'

import { useEndpoint } from './useEndpoint'

export type CodeBookMetaData = {
  code: string
  type: string
  nodeLabel?: string
  roleEdit?: string
}

export type CodebookTypeResponse = {
  metadata: CodeBookMetaData
  data: CodebookType[]
}

export type CodebookType = { name: string; uid: string; additionalData?: string }

export type CodebookFilter = {
  key: string
  value: any
}

export type CodebookQuery = {
  filter?: CodebookFilter[]
  searchText?: string
  limit?: number
}
export const useCodebook = (codebookName?: CODEBOOK, query?: CodebookQuery) => {
  const filterString = JSON.stringify(query?.filter)
  const { codebook } = useEndpoint({
    path: codebookName,
    query: { ...query, filter: filterString }
  })
  const { data, mutate, isLoading } = useSWR<CodebookTypeResponse>(codebookName && codebook, fetcher, {
    suspense: false,
    keepPreviousData: true
  })

  return { data, mutate, isLoading }
}
