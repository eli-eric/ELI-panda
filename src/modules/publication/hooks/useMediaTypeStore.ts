import { create } from 'zustand'

import { MEDIA_TYPE_CODE } from '../types/constants'

type MediaTypeStore = {
  mediaType: MEDIA_TYPE_CODE
  setMediaType: (mediaType: MEDIA_TYPE_CODE) => void
}

export const useMediaTypeStore = create<MediaTypeStore>(set => ({
  mediaType: MEDIA_TYPE_CODE.PeerReviewedArticle,
  setMediaType: mediaType => set({ mediaType })
}))
