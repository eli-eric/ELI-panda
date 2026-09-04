import { useMutation } from '@tanstack/react-query'

import { fetchRequest } from '@/core/http/fetchClient'
import { buildUrl } from '@/utils/fetcher'
import { getEndpoints } from '@/utils/getEndpoints'

import type { PublicationWosPreviewResponse } from '../types/wos-import'

interface PreviewRequest {
    doi: string
    currentPublicationUid?: string
}

export const usePublicationWosPreview = () => {
    const previewMutation = useMutation({
        mutationKey: ['publication-wos-preview'],
        mutationFn: ({ doi, currentPublicationUid }: PreviewRequest) => {
            const endpoint = getEndpoints({
                query: {
                    doi,
                    currentPublicationUid: currentPublicationUid ?? null,
                },
            }).publicationWosPreview

            return fetchRequest<PublicationWosPreviewResponse>(buildUrl(endpoint))
        },
    })

    return {
        fetchPreview: previewMutation.mutateAsync,
        isPending: previewMutation.isPending,
    }
}
