export type ReportingClassification = 'own-user' | 'own-other' | 'coauthorship' | 'unclassified'
export type ReportingDocumentType = 'article' | 'proceedings' | 'book-chapter' | 'other' | 'unknown'

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
    quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4'
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
    journalRankingStatus?: 'unknown' | 'unranked'
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
