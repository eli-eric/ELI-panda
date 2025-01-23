import type { RadioSelectOption } from '@/components/form/radio-select.comp'

export enum MEDIA_TYPE_LABEL {
  PEER_REVIEWED = 'Peer-Reviewed Article',
  OTHER = 'Other Article'
}
export enum MEDIA_TYPE_CODE {
  PeerReviewedArticle = 'PeerReviewedArticle',
  OtherArticle = 'OtherArticle'
}
export const mediaTypeOptions: RadioSelectOption[] = [
  {
    label: MEDIA_TYPE_LABEL.PEER_REVIEWED,
    value: MEDIA_TYPE_CODE.PeerReviewedArticle,
    disabled: false
  },

  {
    label: MEDIA_TYPE_LABEL.OTHER,
    value: MEDIA_TYPE_CODE.OtherArticle,
    disabled: false
  }
]

export const MEDIA_TYPE_MAP: Record<MEDIA_TYPE_CODE, MEDIA_TYPE_LABEL> = {
  [MEDIA_TYPE_CODE.PeerReviewedArticle]: MEDIA_TYPE_LABEL.PEER_REVIEWED,
  [MEDIA_TYPE_CODE.OtherArticle]: MEDIA_TYPE_LABEL.OTHER
}
