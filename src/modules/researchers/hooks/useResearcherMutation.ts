import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { ResearcherFormData } from '../form/researcher-form.schema'
import type { Researcher } from '../types/researcher.types'

interface UseResearcherMutationOptions {
    uid?: string
    onSuccess?: (data: Researcher) => void
}

export const useResearcherMutation = ({ uid, onSuccess }: UseResearcherMutationOptions = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: uid ? ['researcher', uid] : ['create-researcher'],
        mutationFn: queryMutate<Researcher, ResearcherFormData>(
            'researcher',
            uid ? 'put' : 'post',
            { uid },
        ),
        onSuccess: async response => {
            await queryClient.invalidateQueries({ queryKey: ['researchers'] })
            if (uid) {
                await queryClient.invalidateQueries({
                    queryKey: ['researcher', { uid }],
                })
            }
            onSuccess?.(response.data)
        },
    })
}
