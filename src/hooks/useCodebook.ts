import { fetcher } from 'src/features/fetcher'
import useSWR from 'swr/immutable'

import { CODEBOOK } from '@/types/constants/codebook'
import { Option } from '@/types/form'

import { useEndpoint } from './useEndpoint'

type codebookType = { name: string; uid: string }[]
export const useCodebook = (
  codebookName: CODEBOOK,
  parentCode?: string
): codebookType | undefined => {
  const { codebook } = useEndpoint({
    path: `/${codebookName}`,
    query: parentCode ? `?parentUID=${parentCode}` : undefined
  })
  const { data } = useSWR<{ name: string; uid: string }[]>(codebook, fetcher, {
    suspense: false
  })

  return data
}

export const useCodebookSelectValues = (
  codebookName: CODEBOOK,
  parentCode?: string
): Option[] | undefined => {
  const codebook = useCodebook(codebookName, parentCode)

  const selectOptions = codebook?.map(({ name, uid }) => ({ name, value: uid }))

  return selectOptions
}
