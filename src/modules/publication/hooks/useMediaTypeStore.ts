import { create } from 'zustand'

import { MEDIA_TYPE_CODE } from '../types/constants'

type MediaTypeStore = {
    mediaType: MEDIA_TYPE_CODE
    mediaTypeUid: string | undefined
    setMediaType: (mediaType: MEDIA_TYPE_CODE) => void
    setMediaTypeUid: (uid: string | undefined) => void
}

export const useMediaTypeStore = create<MediaTypeStore>(set => ({
    mediaType: MEDIA_TYPE_CODE.PeerReviewedArticle,
    mediaTypeUid: undefined,
    setMediaType: mediaType => set({ mediaType }),
    setMediaTypeUid: mediaTypeUid => set({ mediaTypeUid }),
}))
