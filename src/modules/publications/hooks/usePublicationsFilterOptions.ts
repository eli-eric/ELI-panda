import { useQuery } from '@tanstack/react-query'

import type { PublicationsFilterOptionsResponse } from '@/modules/publications/types/filter'
import { queryFetcher } from '@/utils/fetcher'

/**
 * Distinct values (years, quartils, quartil bases, languages, ELI flags) and
 * numeric/date bounds for the publications filter sheet (ELIPANDA-504).
 * Pattern: useMinMaxPrice — plain TanStack query over a named endpoint key.
 * The endpoint aggregates the whole register (ELIPANDA-503), so one answer is
 * reused for five minutes instead of re-running the scan on every sheet open.
 */
export const usePublicationsFilterOptions = () => {
    const { data } = useQuery({
        queryKey: ['publicationsFilterOptions'],
        queryFn: queryFetcher<PublicationsFilterOptionsResponse>('publicationsFilterOptions'),
        staleTime: 5 * 60 * 1000,
    })

    return { filterOptions: data }
}
