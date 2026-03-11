import { create } from 'zustand'

import { MEDIA_TYPE_CODE } from '../types/constants'

type MediaTypeStore = {
    mediaType: MEDIA_TYPE_CODE
    mediaTypeCode: string | undefined
    setMediaType: (mediaType: MEDIA_TYPE_CODE) => void
    setMediaTypeCode: (code: string | undefined) => void
}

export const useMediaTypeStore = create<MediaTypeStore>(set => ({
    mediaType: MEDIA_TYPE_CODE.PeerReviewedArticle,
    mediaTypeCode: undefined,
    setMediaType: mediaType => set({ mediaType }),
    setMediaTypeCode: mediaTypeCode => set({ mediaTypeCode }),
}))
