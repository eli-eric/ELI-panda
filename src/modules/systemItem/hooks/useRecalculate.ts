import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { SystemsResponse } from '@/types/responses/systems'
import { queryMutate } from '@/utils/fetcher'

import { useSystemsReload } from './useSystemsReload'

export const useRecalculate = ({
    onSuccess,
    tableId = 'systems',
    enableQueryURL = false,
}: {
    onSuccess?: () => void
    tableId?: string
    enableQueryURL?: boolean
}) => {
    const [reloadSystems] = useSystemsReload({ tableId, onSuccess, enableQueryURL })

    const { mutate, isPending } = useMutation({
        mutationFn: queryMutate<SystemsResponse, any>('recalculateSpareParts', 'post'),
        onError: error => {
            toast.error('Something went wrong: ' + error.message)
        },
        onSuccess: () => {
            reloadSystems()
        },
    })

    return [mutate, isPending] as const
}
