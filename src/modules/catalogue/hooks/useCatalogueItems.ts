import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import useQueryManager from '@/hooks/useQueryManager'
import { message } from '@/i18n/src/messages'
import type { CatalogueItemsResponse } from '@/types/responses/catalogue'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
export const useCatalogueItems = (tableId = 'catalogueItems') => {
  const { query } = useQueryManager(tableId)
  const pagination = JSON.parse(query.pagination || '{}')
  const queryKey: QueryFetcherKey = [
    'catalogueItems',
    { query: { ...pagination, ...query } }
  ]
  const {
    data,
    isFetching: loading,
    error
  } = useQuery({
    queryKey,
    queryFn: queryFetcher<CatalogueItemsResponse>('catalogueItems'),
    refetchOnMount: true
  })

  const { formatMessage: fm } = useIntl()
  useEffect(() => {
    if (error) {
      toast.error(
        fm(
          { id: message.catalogue.items.errorFetching },
          { reason: error.message }
        )
      )
    }
  }, [error, fm])

  const queryClient = useQueryClient()
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey
    })

  return { catalogueItems: data, loading, error, refetch }
}
