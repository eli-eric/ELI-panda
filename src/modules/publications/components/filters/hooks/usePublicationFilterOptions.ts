import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { GrantsResponse } from '@/modules/grants/types/grant.types'
import type { ResearchersResponse } from '@/modules/researchers/types/researcher.types'
import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

/**
 * Researchers and grants for the filter comboboxes.
 *
 * Neither is a codebook, so they are fetched from their own endpoints and
 * shaped into `CodebookType` for `Combobox`'s `codebookResponse` prop. The
 * filter sends the uid, which is what the API matches on.
 */
export const usePublicationFilterOptions = () => {
    const { data: researchers } = useQuery({
        queryKey: ['publication-filter-researchers'],
        queryFn: queryFetcher<ResearchersResponse>('researchers'),
    })

    const { data: grants } = useQuery({
        queryKey: ['publication-filter-grants'],
        queryFn: queryFetcher<GrantsResponse>('grants'),
    })

    const researcherOptions = useMemo<CodebookType[]>(
        () =>
            (researchers?.data ?? []).map(researcher => ({
                uid: researcher.uid,
                name: `${researcher.lastName}, ${researcher.firstName}`,
            })),
        [researchers],
    )

    const grantOptions = useMemo<CodebookType[]>(
        () =>
            (grants?.data ?? []).map(grant => ({
                uid: grant.uid,
                name: grant.code ? `${grant.code} — ${grant.name}` : grant.name,
            })),
        [grants],
    )

    return { researcherOptions, grantOptions }
}
