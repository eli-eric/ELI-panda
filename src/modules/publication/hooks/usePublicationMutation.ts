import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

import { queryMutate } from '@/utils/fetcher'

import type { Publication } from '../types/responses'

export const usePublicationMutation = () => {
    const router = useRouter()
    const uid = router.query.uid as string | undefined

    return useMutation({
        mutationKey: uid ? ['publication', uid] : ['create-publication'],
        mutationFn: queryMutate<Publication, Publication>('publication', uid ? 'put' : 'post', { uid }),
        onError: (error: any) => {
            toast.error(`Error: ${error.response?.data?.message}`)
        },
    })
}
