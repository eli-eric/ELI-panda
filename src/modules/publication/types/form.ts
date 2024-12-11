import type { CodebookType } from '@/types/responses/codebook'

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
  allAuthorsCount: string
  eliAuthors: string
  eliAuthorsCount: string
  authorsDepartments: AuthorsDepartment[]
  longJournalTitle: string
  volume: string
  issue?: string
  pages: string
  pagesCount: string
  citeAs: string
  impactFactor?: string
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
