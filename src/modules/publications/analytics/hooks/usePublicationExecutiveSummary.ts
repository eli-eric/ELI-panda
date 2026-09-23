import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { ExecutiveSummaryQuery, PublicationExecutiveSummary } from '../types/executive-summary'

export const PUBLICATION_EXECUTIVE_SUMMARY_KEY = 'publicationExecutiveSummary'

/**
 * Reads the management report for a year and trend window.
 *
 * The key matches the one the publication detail and create containers
 * invalidate, so saving a reporting review refreshes the dashboard.
 */
export const usePublicationExecutiveSummary = ({
    year,
    startYear,
    endYear,
}: ExecutiveSummaryQuery) =>
    useQuery<PublicationExecutiveSummary, AxiosError, PublicationExecutiveSummary, QueryFetcherKey>(
        {
            queryKey: [PUBLICATION_EXECUTIVE_SUMMARY_KEY, { query: { year, startYear, endYear } }],
            queryFn: queryFetcher<PublicationExecutiveSummary>(PUBLICATION_EXECUTIVE_SUMMARY_KEY),
        },
    )
