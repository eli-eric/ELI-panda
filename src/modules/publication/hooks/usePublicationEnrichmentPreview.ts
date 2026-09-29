import { useMutation } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import {
    ENRICHMENT_PREVIEW_TIMEOUT_MS,
    type EnrichmentPreviewRequest,
    type EnrichmentPreviewResponse,
} from '../types/enrichment'

/**
 * Asks the gateway to consult every configured provider for a DOI.
 *
 * The request is a POST because the preview spends provider quota and is not a
 * cacheable read, even though it writes nothing to PANDA.
 */
export const usePublicationEnrichmentPreview = () => {
    const previewMutation = useMutation({
        mutationKey: ['publication-enrichment-preview'],
        mutationFn: async (request: EnrichmentPreviewRequest) => {
            const response = await queryMutate<EnrichmentPreviewResponse, EnrichmentPreviewRequest>(
                'publicationEnrichmentPreview',
                'post',
                {
                    timeoutMs: ENRICHMENT_PREVIEW_TIMEOUT_MS,
                },
            )({
                doi: request.doi,
                currentPublicationUid: request.currentPublicationUid,
            })

            return response.data
        },
    })

    return {
        fetchEnrichmentPreview: previewMutation.mutateAsync,
        isPending: previewMutation.isPending,
    }
}
