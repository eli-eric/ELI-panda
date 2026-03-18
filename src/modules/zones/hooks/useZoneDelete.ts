import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

export const useZoneDelete = (uid: string) => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: queryMutate('zone', 'delete', uid),
        mutationKey: ['zone', { uid }],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['zones'] })
        },
    })

    return mutate
}
