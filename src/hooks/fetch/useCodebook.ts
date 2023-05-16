import { useSession } from 'next-auth/react'
import useSWR from 'swr/immutable'

import { fetcher } from '@/helpers/fetcher'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { Option } from '@/types/form'

import { useEndpoint } from './useEndpoint'

export type CodebookType = { name: string; uid: string; additionalData?: string }
export const useCodebook = (
  codebookName?: CODEBOOK,
  query?: string,
  autocomplete?: boolean
): CodebookType[] | undefined => {
  const { data: session } = useSession()

  const { codebook } = useEndpoint({
    path: `/${codebookName}`,
    query: query
  })
  const { codebookAutocomplete } = useEndpoint({
    path: `/${codebookName}`,
    query: query
  })

  const codebookEndpoint = autocomplete ? codebookAutocomplete : codebook

  const { data } = useSWR<{ name: string; uid: string }[]>(session?.user && codebookEndpoint, fetcher, {
    suspense: false
  })

  return data
}

export const useCodebookSelectValues = (codebookName: CODEBOOK, query?: string): Option[] | undefined => {
  const codebook = useCodebook(codebookName, query)

  const selectOptions = codebook?.map(({ name, uid }) => ({ name, value: uid }))

  return selectOptions
}
