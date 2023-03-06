import { fetcher } from 'src/features/fetcher'
import useSWR from 'swr/immutable'

import { CODEBOOK } from '@/types/constants/codebook'
import { Option } from '@/types/form'

import { useEndpoint } from './useEndpoint'

export type CodebookType = { name: string; uid: string }
export const useCodebook = (
  codebookName?: CODEBOOK,
  query?: string,
  autocomplete?: boolean
): CodebookType[] | undefined => {
  const { codebook } = useEndpoint({
    path: `/${codebookName}`,
    query: query
  })
  const { codebookAutocomplete } = useEndpoint({
    path: `/${codebookName}`,
    query: query
  })
  const { data } = useSWR<{ name: string; uid: string }[]>(
    autocomplete ? codebookAutocomplete : codebook,
    fetcher,
    {
      suspense: false
    }
  )

  return data
}

export const useCodebookSelectValues = (
  codebookName: CODEBOOK,
  query?: string
): Option[] | undefined => {
  const codebook = useCodebook(codebookName, query)

  const selectOptions = codebook?.map(({ name, uid }) => ({ name, value: uid }))

  return selectOptions
}
