import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import { type PublicationWosPreviewResponse, WOS_PREVIEW_TIMEOUT_MS } from '../types/wos-import'

interface PreviewRequest {
    doi: string
    currentPublicationUid?: string
}

export const usePublicationWosPreview = () => {
    const previewMutation = useMutation({
        mutationKey: ['publication-wos-preview'],
        mutationFn: async ({ doi, currentPublicationUid }: PreviewRequest) => {
            const response = await queryMutate<PublicationWosPreviewResponse, void>(
                'publicationWosPreview',
                'get',
                {
                    query: {
                        doi,
                        currentPublicationUid: currentPublicationUid ?? null,
                    },
                    timeoutMs: WOS_PREVIEW_TIMEOUT_MS,
                },
            )()

            return response.data
        },
    })

    return {
        fetchPreview: previewMutation.mutateAsync,
        isPending: previewMutation.isPending,
    }
}
