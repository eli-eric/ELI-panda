import { useMutation } from '@tanstack/react-query'

import { fetchRequest } from '@/core/http/fetchClient'
import { buildUrl } from '@/utils/fetcher'
import { getEndpoints } from '@/utils/getEndpoints'

import type { ResearcherIdLink } from '../types/wos-import'

export const useRememberResearcherId = () => {
    const mutation = useMutation({
        mutationKey: ['researcher-wos-id'],
        mutationFn: ({ researcherUid, researcherId }: ResearcherIdLink) => {
            const endpoint = getEndpoints({ uid: researcherUid }).researcherWosIds
            if (!endpoint) throw new Error('Researcher UID is required')

            return fetchRequest<void>(buildUrl(endpoint), {
                method: 'PUT',
                body: { researcherId },
            })
        },
    })

    return {
        rememberResearcherId: mutation.mutateAsync,
        isPending: mutation.isPending,
    }
}
