import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

export const useGrantDelete = (uid: string) => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: queryMutate('grant', 'delete', { uid }),
        mutationKey: ['grant', { uid }],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grants'] })
        },
    })

    return mutate
}
