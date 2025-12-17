import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import type { CodebookType } from '@/types/responses/codebook'

export interface Publication {
  uid?: string
  mediaType: string
  code: string
  experimentalSystem?: string
  userCall?: CodebookType
  userExperiment?: CodebookType
  doi?: string
  webLink?: string
  openAccessType: CodebookType
  title: string
  allAuthors: string
  allAuthorsCount: number
  eliAuthors?: string // Deprecated: kept for backward compatibility
  eliResearchers: SelectedResearcher[]
  eliAuthorsCount: number
  authorsDepartments: AuthorsDepartment[]
  longJournalTitle: string
  volume?: number
  issue?: number
  pages: string
  pagesCount: number
  citeAs: string
  impactFactor?: number
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
  language?: CodebookType
  note?: string
  shortJournalTitle?: string
}

export type AuthorsDepartment = {
  department: CodebookType | null
  authorsCount: string | number
}
