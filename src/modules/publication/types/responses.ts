import type { CodebookType } from '@/types/responses/codebook'

export type Publication = {
  uid: string
  pdfFileName: string
  pdfFileUrl: string
  articleTitle: string
  doi: string
  journalTitle: string
  volume: number
  issue: number
  pagesFrom: number
  pagesTo: number
  pagesTotal: number
  citationsCount: number
  impactFactor: number
  quartile: string
  year: string
  publishDate: string
  abstract: string
  keywords: string
  oecdFord: string
  wosNumber: string
  issn: string
  eissn: string
  url: string
  eidScopus: string
  userCall: CodebookType
  useExperiment: CodebookType
  publicationCategory: CodebookType
  openAccessType: CodebookType
  language: string
  publicationSupport: CodebookType
  state: string
  authors?: PublicationAuthor[]
}

type PublicationStatistics = {
  uid: string
  totalCount: number
  ericCount: number
  beamLinesCount: number
  alpsCount: number
}

export type PublicationAuthor = {
  uid: string
  name: string
  wosName: string
  researcherId: string
  facility: CodebookType
}

export type Uid = string
