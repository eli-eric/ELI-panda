import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver } from 'react-hook-form'

import { isPeerReviewedMediaType, MEDIA_TYPE_CODE } from '../types/constants'
import { publicationOtherSchema, publicationPeerReviewedSchema } from './scheme'

/** Uses the selected codebook, falling back to the older form's media-type radio. */
export const publicationResolver: Resolver<any> = (values, context, options) => {
    const isPeerReviewed = values.mediaTypeCb
        ? isPeerReviewedMediaType(values.mediaTypeCb)
        : values.mediaType === MEDIA_TYPE_CODE.PeerReviewedArticle
    const schema = isPeerReviewed ? publicationPeerReviewedSchema : publicationOtherSchema
    return zodResolver(schema)(values, context, options)
}
