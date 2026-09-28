import { useQuery } from '@tanstack/react-query'

import type { PublicationsFilterOptionsResponse } from '@/modules/publications/components/filters/types/filter'
import { queryFetcher } from '@/utils/fetcher'

/**
 * Distinct values (years, quartils, quartil bases, languages, ELI flags) and
 * numeric/date bounds for the publications filter sheet (ELIPANDA-504).
 * Pattern: useMinMaxPrice — plain TanStack query over a named endpoint key.
 */
export const usePublicationsFilterOptions = () => {
    const { data } = useQuery({
        queryKey: ['publicationsFilterOptions'],
        queryFn: queryFetcher<PublicationsFilterOptionsResponse>('publicationsFilterOptions'),
    })

    return { filterOptions: data }
}
