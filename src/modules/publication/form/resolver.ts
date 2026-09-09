import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver } from 'react-hook-form'

import { isPeerReviewedMediaType } from '../types/constants'
import { createPublicationOtherSchema, createPublicationPeerReviewedSchema } from './scheme'

export interface PublicationValidationContext {
    originalDoi?: string | null
}

/** Selects the media schema while retaining the persisted DOI for legacy edit validation. */
export const publicationResolver: Resolver<any, PublicationValidationContext> = (
    values,
    context,
    options,
) => {
    const schema = isPeerReviewedMediaType(values.mediaTypeCb)
        ? createPublicationPeerReviewedSchema(context?.originalDoi)
        : createPublicationOtherSchema(context?.originalDoi)
    return zodResolver(schema)(values, context, options)
}
