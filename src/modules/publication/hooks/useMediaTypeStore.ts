import { create } from 'zustand'

import { MEDIA_TYPE } from '../types/constants'

type MediaTypeStore = {
  mediaType: MEDIA_TYPE
  setMediaType: (mediaType: MEDIA_TYPE) => void
}

export const useMediaTypeStore = create<MediaTypeStore>(set => ({
  mediaType: MEDIA_TYPE.PeerReviewedArticle,
  setMediaType: mediaType => set({ mediaType })
}))
