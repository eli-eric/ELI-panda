import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

export const usePublicationDelete = (uid: string) => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: queryMutate('publication', 'delete', { uid }),
        mutationKey: ['publication', { uid }],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['publications'] })
        },
    })

    return mutate
}
