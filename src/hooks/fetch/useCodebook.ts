import { startTransition, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr/immutable'

import type { CODEBOOK } from '@/types/constants/codebook'
import type { SystemLevel } from '@/types/gql/graphql'
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
export const useCodebook = (codebookName?: CODEBOOK, query?: CodebookQuery, keepPreviousData: boolean = true) => {
  const filterString = JSON.stringify(query?.filter)
  const { codebook } = useEndpoint({
    path: codebookName,
    query: { ...query, filter: filterString }
  })

  const [data, setData] = useState<CodebookTypeResponse | undefined>()

  const {
    data: d,
    mutate,
    isLoading,
    isValidating
  } = useSWR<CodebookTypeResponse>(codebookName && codebook, fetcher, {
    suspense: false,
    keepPreviousData,
    onError: () => {
      toast.error(`Failed to fetch codebook: ${codebookName}`)
    }
  })

  useEffect(() => {
    if (d) {
      startTransition(() => {
        setData(d)
      })
    }
  }, [d])

  return { data, mutate, isLoading: isLoading || isValidating }
}
