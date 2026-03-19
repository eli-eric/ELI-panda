import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

export const useZoneDelete = (uid: string) => {
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: queryMutate('zone', 'delete', uid, undefined, undefined, 'text'),
        mutationKey: ['zone', { uid }],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['zones'] })
        },
    })

    return mutateAsync
}
