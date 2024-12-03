import type { CodebookType } from '@/types/responses/codebook'

import type { PublicationAuthor } from './responses'

export type PublicationForm = {
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
  language: CodebookType
  publicationSupport: CodebookType
  state: CodebookType
  authors: PublicationAuthor[]
}
