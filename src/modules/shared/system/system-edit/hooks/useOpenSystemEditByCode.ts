import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import { useSystemEditSheet } from '../useSystemEditSheet'

const CODE_LOOKUP_PAGE_SIZE = 20

const isSameCode = (a?: string | null, b?: string) =>
    !!a && !!b && a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0

/**
 * Opens the Edit System sheet for a system identified by its system code (the
 * facility layout iframe links devices by code). Resolved through the systems
 * search — only an exact code match opens the sheet.
 */
export const useOpenSystemEditByCode = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const openSystemEdit = useSystemEditSheet()

    return useCallback(
        async (systemCode: string) => {
            const queryKey: QueryFetcherKey = [
                'systemCodeLookup',
                {
                    query: {
                        search: systemCode,
                        pagination: JSON.stringify({ page: 1, pageSize: CODE_LOOKUP_PAGE_SIZE }),
                    },
                },
            ]
            try {
                const result = await queryClient.fetchQuery({
                    queryKey,
                    queryFn: queryFetcher<SystemsResponse>('systemsList'),
                })
                const match = result.data.find(system => isSameCode(system.systemCode, systemCode))
                if (match) {
                    openSystemEdit(match.uid)
                    return
                }
                toast.warning(
                    fm({ id: message.systemHierarchy.sheet.noSystemForCode }, { code: systemCode }),
                )
            } catch {
                toast.error(fm({ id: message.systemHierarchy.sheet.loadError }))
            }
        },
        [fm, queryClient, openSystemEdit],
    )
}
