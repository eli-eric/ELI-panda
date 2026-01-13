import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import type { CodebookType } from '@/types/responses/codebook'

export interface Publication {
  uid?: string
  /** @deprecated use mediaTypeCb */
  mediaType: string
  mediaTypeCb?: CodebookType
  code: string
  /** @deprecated use experimentalSystemCb */
  experimentalSystem?: string
  experimentalSystemCb?: CodebookType
  userCall?: CodebookType
  /**  @deprecated use userExperimentCb */
  userExperiment?: string
  userExperimentCb?: CodebookType
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
  /**  @deprecated use grantCb */
  grant?: string
  grantCb?: CodebookType
  foreignGrant?: string
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
