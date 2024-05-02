import type { CODEBOOK } from '@/types/constants/codebook'
import type { SystemLevel } from '@/types/gql/graphql'
import { queryFetcher } from '@/utils/fetcher'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { makeQuery } from '@/utils/formatters'

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

export type CodebookType = {
  name: string
  uid: string
  additionalData?: string
  code?: string
  systemLevel?: SystemLevel
}

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
  const filterString = JSON.stringify(query?.filter || '')

  const queryKey = [
    'codebook',
    {
      path: codebookName,
      query: makeQuery({ ...query, filter: filterString })
    }
  ]

  const { data, isLoading } = useQuery<CodebookTypeResponse>({
    queryKey: queryKey,
    queryFn: queryFetcher('codebook'),
    placeholderData: keepPreviousData,
    enabled: !!codebookName
  })

  return { data, isLoading, queryKey }
}
