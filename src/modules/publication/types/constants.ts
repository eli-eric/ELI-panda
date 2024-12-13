import type { RadioSelectOption } from '@/components/form/radio-select.comp'

export enum MEDIA_TYPE {
  PeerReviewedArticle = 'Peer-Reviewd Article',
  OtherArticle = 'Other Article'
}
export const mediaTypeOptions: RadioSelectOption[] = [
  {
    label: MEDIA_TYPE.PeerReviewedArticle,
    value: MEDIA_TYPE.PeerReviewedArticle,
    disabled: false
  },

  {
    label: MEDIA_TYPE.OtherArticle,
    value: MEDIA_TYPE.OtherArticle,
    disabled: false
  }
]
