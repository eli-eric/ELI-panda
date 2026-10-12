import { createIntl, createIntlCache } from 'react-intl'

import { messages } from '@/i18n/src/messages'

import type { PublicationExecutiveSummary } from '../types/executive-summary'
import { buildReportDocument, reportFileName } from '../utils/report-rows'

const intl = createIntl({ locale: 'en', messages: messages.en }, createIntlCache())

const summary: PublicationExecutiveSummary = {
    year: 2025,
    startYear: 2024,
    endYear: 2025,
    generatedAt: '2026-01-02T03:04:05Z',
    policyVersion: '2026-09-reporting-v1',
    totalPublications: 4,
    totalOwnPublications: 2,
    totalUserPublications: 1,
    otherPublications: 1,
    coauthorshipPublications: 1,
    unclassifiedPublications: 1,
    pendingReviewPublications: 2,
    departmentMatrix: [
        {
            uid: 'd86',
            name: 'D86',
            q10Percent: 1,
            q10To25: 0,
            q1Unsplit: 0,
            q2: 0,
            q3: 1,
            q4: 0,
            proceedings: 0,
            bookChapters: 0,
            other: 0,
            unranked: 0,
            unknown: 0,
            totalOwn: 1,
            coAuthorship: 1,
            total: 2,
            userPublications: 1,
        },
    ],
    ownQuality: [{ quality: 'q10Percent', count: 1 }],
    userQuality: [{ quality: 'q10Percent', count: 1 }],
    userPublicationsByCall: [{ uid: 'call-1', name: 'Call 1', count: 1 }],
    userPublicationsByDepartment: [{ uid: 'd86', name: 'D86', count: 1 }],
    systemBreakdown: [],
    journalFrequencies: [{ uid: 'prl', name: 'Physical Review Letters', count: 2 }],
    topPublishingAuthors: [
        {
            researcherUid: 'r1',
            name: 'Nováková Jana',
            departmentUids: ['d86'],
            totalAuthorships: 2,
            firstAuthorCount: 1,
            correspondingCount: 0,
            unknownFirstAuthorCount: 1,
            unknownCorrespondingCount: 2,
        },
    ],
    q3q4HistoricalTrend: [
        {
            year: 2024,
            own: { q3q4Count: 0, rankedCount: 0, percent: null },
            user: { q3q4Count: 0, rankedCount: 0, percent: null },
        },
        {
            year: 2025,
            own: { q3q4Count: 22, rankedCount: 78, percent: 28.205128 },
            user: { q3q4Count: 1, rankedCount: 2, percent: 50 },
        },
    ],
}

describe('buildReportDocument', () => {
    it('carries the filters and provenance so an exported file states what produced it', () => {
        const report = buildReportDocument(summary, intl)

        expect(report.subtitle).toContain('2025')
        expect(report.meta.join(' ')).toContain('2026-09-reporting-v1')
        expect(report.meta.join(' ')).toContain('2024')
    })

    it('states the unreviewed backlog rather than reporting only the classified figures', () => {
        const report = buildReportDocument(summary, intl)

        // A reader must be able to tell that one record is unclassified and two
        // are awaiting review, not just that two are "own".
        expect(report.meta.join(' ')).toContain('1 of 4')
        expect(report.meta.join(' ')).toContain('2 are awaiting review')
    })

    it('reports a year with no ranked papers as such instead of as zero percent', () => {
        const report = buildReportDocument(summary, intl)
        const trend = report.tables.find(table => table.title === 'Q3 + Q4 share')

        expect(trend).toBeDefined()
        expect(trend!.rows[0]).toEqual(['2024', 'No ranked papers', 'No ranked papers'])
        // The agreed fixture: 22 of 78 ranked own papers.
        expect(trend!.rows[1][1]).toBe('28.21 % (22/78)')
    })

    it('keeps the counting caveat next to the department table it applies to', () => {
        const report = buildReportDocument(summary, intl)
        const departments = report.tables.find(table => table.title === 'Departments')

        expect(departments!.note).toContain('credited once in every department')
        expect(departments!.rows[0][0]).toBe('D86')
    })

    it('names the file after the reporting year', () => {
        expect(reportFileName(summary, 'docx')).toBe('publication-report-2025.docx')
        expect(reportFileName(summary, 'pdf')).toBe('publication-report-2025.pdf')
    })
})
