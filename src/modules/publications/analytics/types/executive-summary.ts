/** Mirrors models.ExecutiveSummary in eli-panda-api. */

/**
 * Quality bands, in reporting order. The first three are the Q1 split: a paper
 * at or above the 90th percentile is top-10%, below it is 10-25%, and one whose
 * percentile is unknown stays unsplit rather than being guessed into a half.
 */
export const QUALITY_BANDS = [
    'q10Percent',
    'q10To25',
    'q1Unsplit',
    'q2',
    'q3',
    'q4',
    'proceedings',
    'bookChapters',
    'other',
    'unranked',
    'unknown',
] as const

export type QualityBand = (typeof QUALITY_BANDS)[number]

/** Bands that represent a known journal quartile — the Q3+Q4 denominator. */
export const RANKED_BANDS: QualityBand[] = ['q10Percent', 'q10To25', 'q1Unsplit', 'q2', 'q3', 'q4']

/** UID the backend uses for papers with no confirmed link of a given kind. */
export const UNLINKED_UID = '__unlinked__'

export interface ReportingQualityCount {
    quality: QualityBand
    count: number
}

export interface ReportingCount {
    uid: string
    name: string
    count: number
}

export interface DepartmentReportingRow {
    uid: string
    name: string
    q10Percent: number
    q10To25: number
    q1Unsplit: number
    q2: number
    q3: number
    q4: number
    proceedings: number
    bookChapters: number
    other: number
    unranked: number
    unknown: number
    totalOwn: number
    coAuthorship: number
    total: number
    userPublications: number
}

export interface ReportingAuthorStats {
    researcherUid: string
    name: string
    departmentUids: string[]
    totalAuthorships: number
    firstAuthorCount: number
    correspondingCount: number
    unknownFirstAuthorCount: number
    unknownCorrespondingCount: number
}

/**
 * `percent` is null when no paper in the cohort carries a known quartile. That
 * is not zero — the rate is unknown — and the UI renders it as N/A.
 */
export interface ReportingFraction {
    q3q4Count: number
    rankedCount: number
    percent: number | null
}

export interface ReportingTrend {
    year: number
    own: ReportingFraction
    user: ReportingFraction
}

export interface PublicationExecutiveSummary {
    year: number
    startYear: number
    endYear: number
    generatedAt: string
    policyVersion: string
    /** Distinct publications. Department rows below may sum higher. */
    totalPublications: number
    totalOwnPublications: number
    totalUserPublications: number
    otherPublications: number
    coauthorshipPublications: number
    unclassifiedPublications: number
    pendingReviewPublications: number
    departmentMatrix: DepartmentReportingRow[]
    ownQuality: ReportingQualityCount[]
    userQuality: ReportingQualityCount[]
    userPublicationsByCall: ReportingCount[]
    userPublicationsByDepartment: ReportingCount[]
    systemBreakdown: ReportingCount[]
    journalFrequencies: ReportingCount[]
    topPublishingAuthors: ReportingAuthorStats[]
    q3q4HistoricalTrend: ReportingTrend[]
}

export interface ExecutiveSummaryQuery {
    year: number
    startYear: number
    endYear: number
}

/** The latest completed calendar year, which the dashboard opens on. */
export const defaultReportYear = (now: Date = new Date()) => now.getFullYear() - 1

/** The reporting year plus the six years before it. */
export const defaultReportWindow = (now: Date = new Date()): ExecutiveSummaryQuery => {
    const year = defaultReportYear(now)
    return { year, startYear: year - 6, endYear: year }
}
