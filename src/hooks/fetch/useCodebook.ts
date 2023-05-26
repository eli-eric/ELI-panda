import useSWR from 'swr/immutable'

import { fetcher } from '@/helpers/fetcher'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { ROLE } from '@/types/constants/roles'
import type { Option } from '@/types/form'

import { useEndpoint } from './useEndpoint'

export type CodeBookMetaData = {
  code: string
  type: string
  nodeLabel?: string
  roleEdit?: ROLE
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
export const useCodebook = (codebookName?: CODEBOOK, query?: CodebookQuery): CodebookTypeResponse | undefined => {
  const filterString = JSON.stringify(query?.filter)
  const { codebook } = useEndpoint({
    path: codebookName,
    query: { ...query, filter: filterString }
  })
  const { data } = useSWR<CodebookTypeResponse>(codebook, fetcher, {
    suspense: false
  })

  return data
}

export const useCodebookSelectValues = (codebookName: CODEBOOK, query?: CodebookQuery): Option[] | undefined => {
  const codebook = useCodebook(codebookName, query)

  const selectOptions = codebook?.data?.map(({ name, uid }) => ({ name, value: uid }))

  return selectOptions
}
