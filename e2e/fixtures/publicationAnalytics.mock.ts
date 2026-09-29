import type { PublicationExecutiveSummary } from '../../src/modules/publications/analytics/types/executive-summary'

export const ANALYTICS_YEAR = 2025

/**
 * A deliberately awkward report: department credits exceed the institutional
 * total, part of the cohort is unreviewed, and one trend year has no ranked
 * papers at all. Those are the cases the dashboard has to state honestly.
 */
export const PUBLICATION_EXECUTIVE_SUMMARY: PublicationExecutiveSummary = {
    year: ANALYTICS_YEAR,
    startYear: ANALYTICS_YEAR - 1,
    endYear: ANALYTICS_YEAR,
    generatedAt: '2026-01-02T03:04:05Z',
    policyVersion: '2026-09-reporting-v1',
    totalPublications: 10,
    totalOwnPublications: 6,
    totalUserPublications: 2,
    otherPublications: 4,
    coauthorshipPublications: 1,
    unclassifiedPublications: 3,
    pendingReviewPublications: 4,
    departmentMatrix: [
        {
            uid: 'dept-86',
            name: 'Department 86',
            q10Percent: 2,
            q10To25: 1,
            q1Unsplit: 0,
            q2: 1,
            q3: 1,
            q4: 0,
            proceedings: 0,
            bookChapters: 0,
            other: 0,
            unranked: 0,
            unknown: 1,
            totalOwn: 5,
            coAuthorship: 1,
            total: 6,
            userPublications: 2,
        },
        {
            uid: 'dept-88',
            name: 'Department 88',
            q10Percent: 1,
            q10To25: 0,
            q1Unsplit: 1,
            q2: 0,
            q3: 0,
            q4: 1,
            proceedings: 0,
            bookChapters: 0,
            other: 0,
            unranked: 0,
            unknown: 0,
            totalOwn: 3,
            coAuthorship: 0,
            total: 3,
            userPublications: 1,
        },
    ],
    ownQuality: [
        { quality: 'q10Percent', count: 2 },
        { quality: 'q3', count: 1 },
        { quality: 'unknown', count: 3 },
    ],
    userQuality: [
        { quality: 'q10Percent', count: 1 },
        { quality: 'q3', count: 1 },
    ],
    userPublicationsByCall: [
        { uid: 'call-1', name: 'Call 1', count: 1 },
        { uid: '__unlinked__', name: 'No confirmed call', count: 1 },
    ],
    userPublicationsByDepartment: [{ uid: 'dept-86', name: 'Department 86', count: 2 }],
    systemBreakdown: [{ uid: 'system-1', name: 'ELIMAIA', count: 1 }],
    journalFrequencies: [
        { uid: 'prl', name: 'Physical Review Letters', count: 3 },
        { uid: 'oe', name: 'Optics Express', count: 1 },
    ],
    topPublishingAuthors: [
        {
            researcherUid: 'researcher-1',
            name: 'Nováková Jana',
            departmentUids: ['dept-86'],
            totalAuthorships: 4,
            firstAuthorCount: 2,
            correspondingCount: 1,
            unknownFirstAuthorCount: 1,
            unknownCorrespondingCount: 2,
        },
    ],
    q3q4HistoricalTrend: [
        {
            year: ANALYTICS_YEAR - 1,
            own: { q3q4Count: 0, rankedCount: 0, percent: null },
            user: { q3q4Count: 0, rankedCount: 0, percent: null },
        },
        {
            year: ANALYTICS_YEAR,
            own: { q3q4Count: 22, rankedCount: 78, percent: 28.205128205128204 },
            user: { q3q4Count: 1, rankedCount: 2, percent: 50 },
        },
    ],
}
