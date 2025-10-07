import type { CodebookType } from '@/types/responses/codebook'

import type {
  PublicationOtherFormData,
  PublicationPeerReviewedFormData
} from '../form/scheme'
import type { AuthorsDepartment } from './responses'

export interface PublicationForm {
  mediaType: string
  code: string
  experimentalSystem?: string
  userCall?: CodebookType
  userExperiment?: CodebookType
  doi: string
  webLink: string
  openAccessType: CodebookType
  title: string
  allAuthors: string
  allAuthorsCount: string | number
  eliAuthors: string
  eliAuthorsCount: string | number
  authorsDepartments: AuthorsDepartment[]
  longJournalTitle: string
  volume: string | number
  issue?: string | number
  pages: string
  pagesCount: string | number
  citeAs: string
  impactFactor?: string | number
  quartilBasis?: string
  quartil?: CodebookType
  yearOfPublication: string
  dateOfPublication?: string
  abstract: string
  keywords: string
  oecdFord?: string
  grant?: string
  wosNumber?: string
  issn?: string
  eissn?: string
  eidScopus?: string
  publishingCountry: CodebookType
  language: CodebookType
  note?: string
}

// Type aliases for form validation
export type PublicationPeerReviewedForm = PublicationPeerReviewedFormData
export type PublicationOtherForm = PublicationOtherFormData
