import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { ZoneFormData } from '../form/zone-form.schema'
import type { Zone } from '../types/zone.types'

interface UseZoneMutationOptions {
    uid?: string
    onSuccess?: (data: Zone) => void
}

export const useZoneMutation = ({ uid, onSuccess }: UseZoneMutationOptions = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: uid ? ['zone', uid] : ['create-zone'],
        mutationFn: queryMutate<Zone, ZoneFormData>(
            'zone',
            uid ? 'put' : 'post',
            uid,
        ),
        onSuccess: async response => {
            await queryClient.invalidateQueries({ queryKey: ['zones'] })
            if (uid) {
                await queryClient.invalidateQueries({
                    queryKey: ['zone', { uid }],
                })
            }
            onSuccess?.(response.data)
        },
    })
}
