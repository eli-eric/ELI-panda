// Single source of truth for the reporting vocabularies: the zod schema and
// the option lists both derive from these arrays, so neither can drift from
// the other or from the backend enums.
export const REPORTING_CLASSIFICATIONS = [
    'own-user',
    'own-other',
    'coauthorship',
    'unclassified',
] as const
export type ReportingClassification = (typeof REPORTING_CLASSIFICATIONS)[number]

export const REPORTING_DOCUMENT_TYPES = [
    'article',
    'proceedings',
    'book-chapter',
    'other',
    'unknown',
] as const
export type ReportingDocumentType = (typeof REPORTING_DOCUMENT_TYPES)[number]

export const REPORTING_QUARTILES = ['Q1', 'Q2', 'Q3', 'Q4'] as const
export type ReportingQuartile = (typeof REPORTING_QUARTILES)[number]

export const REPORTING_RANKING_STATUSES = ['unknown', 'unranked'] as const
export type ReportingJournalRankingStatus = (typeof REPORTING_RANKING_STATUSES)[number]

export interface ReportingAuthor {
    researcherUid: string
    departmentUids: string[]
    isFirstAuthor: boolean | null
    isCorresponding: boolean | null
}

export interface ReportingJournalMetric {
    journalId?: string
    source: 'JCR'
    year: number
    category: string
    quartile: ReportingQuartile
    percentile: number | null
    impactFactor: number | null
}

export interface PublicationReporting {
    classification: ReportingClassification
    reviewed: boolean
    documentType: ReportingDocumentType
    departmentUids: string[]
    authors: ReportingAuthor[]
    userCallUids: string[]
    userExperimentUids: string[]
    experimentalSystemUids: string[]
    journalMetrics: ReportingJournalMetric[]
    journalRankingStatus?: ReportingJournalRankingStatus
    reviewedAt?: string
    reviewedBy?: string
}

export const createPublicationReporting = (): PublicationReporting => ({
    classification: 'unclassified',
    reviewed: false,
    documentType: 'unknown',
    departmentUids: [],
    authors: [],
    userCallUids: [],
    userExperimentUids: [],
    experimentalSystemUids: [],
    journalMetrics: [],
})
