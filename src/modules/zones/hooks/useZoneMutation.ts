import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { Zone, ZoneRequest } from '../types/zone.types'

interface UseZoneMutationOptions {
    uid?: string
    onSuccess?: (data: Zone) => void
}

export const useZoneMutation = ({ uid, onSuccess }: UseZoneMutationOptions = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: uid ? ['zone', uid] : ['create-zone'],
        mutationFn: queryMutate<Zone, ZoneRequest>('zone', uid ? 'put' : 'post', { uid }),
        onSuccess: async response => {
            await queryClient.invalidateQueries({ queryKey: ['zones'] })
            if (uid) {
                await queryClient.invalidateQueries({
                    queryKey: ['zone', { uid }],
                })
            }
            // The zone's default parent system drives generated system codes, so any
            // in-flight preview is now stale — this is what lets the create page recover
            // after the user fixes the zone from inside it.
            await queryClient.invalidateQueries({ queryKey: ['systemCodesPreview'] })
            onSuccess?.(response.data)
        },
    })
}
