import { useQuery } from '@tanstack/react-query'

import type { Grant, GrantsResponse } from '@/modules/grants/types/grant.types'
import type { Researcher, ResearchersResponse } from '@/modules/researchers/types/researcher.types'
import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

/**
 * Autocomplete sources for the publications filter comboboxes that are not
 * backed by an API codebook: grants and researchers have no `/codebook/*`
 * route, so these reuse the plain REST list endpoints already registered in
 * getEndpoints.ts (`/grants`, `/researchers`).
 *
 * Both endpoints page with a server default of 10 rows, so the whole list is
 * requested once (one page of FILTER_SOURCE_PAGE_SIZE) and narrowed
 * client-side by the Combobox (`hasClientFilter`).
 *
 * `department` needs no bespoke source: the DEPARTMENT codebook already exists
 * and is what the publication reporting form uses, so the sheet reuses it via
 * the shared Combobox codebook plumbing.
 */
export const FILTER_SOURCE_PAGE_SIZE = 1000

const fullListQuery = {
    query: { pagination: JSON.stringify({ page: 1, pageSize: FILTER_SOURCE_PAGE_SIZE }) },
}

const toGrantOption = (item: Grant): CodebookType => ({
    uid: item.uid,
    name: item.name || item.code,
})

const toResearcherOption = (item: Researcher): CodebookType => ({
    uid: item.uid,
    name: `${item.firstName} ${item.lastName}`.trim(),
})

export const useGrantFilterOptions = () => {
    const { data } = useQuery({
        queryKey: ['publicationsFilterGrants', fullListQuery],
        queryFn: queryFetcher<GrantsResponse>('grants'),
    })

    return { grantOptions: (data?.data || []).map(toGrantOption) }
}

export const useResearcherFilterOptions = () => {
    const { data } = useQuery({
        queryKey: ['publicationsFilterResearchers', fullListQuery],
        queryFn: queryFetcher<ResearchersResponse>('researchers'),
    })

    return { researcherOptions: (data?.data || []).map(toResearcherOption) }
}
