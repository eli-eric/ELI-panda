import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import useQueryManager from '@/hooks/useQueryManager'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryMutate } from '@/utils/fetcher'

import { type PruneSystemDetail, pruneSystemDetail } from './utils'

type Props = {
    onSuccess?: () => void
    tableId?: string
    enableQueryURL?: boolean
}

export const useSystemsReload = ({
    tableId = 'systems',
    onSuccess,
    enableQueryURL = true,
}: Props) => {
    const { query } = useQueryManager(tableId, undefined, enableQueryURL)

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: queryMutate<SystemDetail[], PruneSystemDetail[]>('systemsReload', 'post'),
        onError: error => {
            toast.error('Something went wrong: ' + error.message)
        },
        onSuccess: data => {
            queryClient.setQueryData<SystemsResponse, QueryFetcherKey>(
                [tableId, { query }],
                prev =>
                    prev
                        ? {
                              ...prev,
                              data: data.data,
                          }
                        : prev,
            )
            onSuccess?.()
        },
    })

    const reload = () => {
        const systems = queryClient.getQueryData<SystemsResponse>([tableId, { query }])
        if (systems) {
            const body = systems?.data.map(pruneSystemDetail)
            mutate(body)
        } else {
            void queryClient.invalidateQueries({ queryKey: [tableId] })
            onSuccess?.()
        }
    }

    return [reload, isPending] as const
}
