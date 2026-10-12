import type { IntlShape } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { type PublicationExecutiveSummary, QUALITY_BANDS } from '../types/executive-summary'
import { BAND_LABEL_IDS } from './labels'

const analytics = message.publicationsAnalytics

export interface ReportTable {
    title: string
    head: string[]
    rows: string[][]
    /** Rendered under the table in both formats, carrying the counting caveat. */
    note?: string
}

export interface ReportDocument {
    title: string
    subtitle: string
    /** Filters and provenance, so an exported file states what produced it. */
    meta: string[]
    tables: ReportTable[]
}

const percentCell = (
    intl: IntlShape,
    fraction: { percent: number | null; q3q4Count: number; rankedCount: number },
) =>
    fraction.percent === null
        ? intl.formatMessage({ id: analytics.trend.noRanked })
        : `${fraction.percent.toFixed(2)} % (${fraction.q3q4Count}/${fraction.rankedCount})`

/**
 * Builds every table in the exported report from the same summary object the
 * dashboard renders.
 *
 * Both exports read this one function, so a Word file and a PDF downloaded from
 * the same screen cannot disagree with each other or with what was displayed.
 */
export const buildReportDocument = (
    summary: PublicationExecutiveSummary,
    intl: IntlShape,
): ReportDocument => {
    const fm = (id: string, values?: Record<string, string | number>) =>
        intl.formatMessage({ id }, values)

    const bandHeadings = QUALITY_BANDS.map(band => fm(BAND_LABEL_IDS[band]))

    return {
        title: fm(analytics.title),
        subtitle: `${fm(analytics.year)}: ${summary.year}`,
        meta: [
            fm(analytics.generated, {
                at: summary.generatedAt,
                version: summary.policyVersion,
            }),
            `${fm(analytics.trendFrom)}: ${summary.startYear} — ${fm(analytics.trendTo)}: ${summary.endYear}`,
            fm(analytics.totals.distinctHint),
            fm(analytics.totals.backlogHint, {
                unclassified: summary.unclassifiedPublications,
                total: summary.totalPublications,
                pending: summary.pendingReviewPublications,
            }),
        ],
        tables: [
            {
                title: fm(analytics.totals.title),
                head: [fm(analytics.totals.title), fm(analytics.journals.count)],
                rows: [
                    [fm(analytics.totals.total), String(summary.totalPublications)],
                    [fm(analytics.totals.own), String(summary.totalOwnPublications)],
                    [fm(analytics.totals.user), String(summary.totalUserPublications)],
                    [fm(analytics.totals.other), String(summary.otherPublications)],
                    [fm(analytics.totals.coauthorship), String(summary.coauthorshipPublications)],
                    [fm(analytics.totals.unclassified), String(summary.unclassifiedPublications)],
                    [fm(analytics.totals.pending), String(summary.pendingReviewPublications)],
                ],
            },
            {
                title: fm(analytics.quality.title),
                head: [
                    fm(analytics.quality.title),
                    fm(analytics.quality.own),
                    fm(analytics.quality.user),
                ],
                rows: QUALITY_BANDS.map(band => [
                    fm(BAND_LABEL_IDS[band]),
                    String(summary.ownQuality.find(entry => entry.quality === band)?.count ?? 0),
                    String(summary.userQuality.find(entry => entry.quality === band)?.count ?? 0),
                ]),
                note: fm(analytics.quality.help),
            },
            {
                title: fm(analytics.departments.title),
                head: [
                    fm(analytics.departments.name),
                    ...bandHeadings,
                    fm(analytics.departments.totalOwn),
                    fm(analytics.departments.coAuthorship),
                    fm(analytics.departments.userPublications),
                    fm(analytics.departments.total),
                ],
                rows: summary.departmentMatrix.map(row => [
                    row.name,
                    ...QUALITY_BANDS.map(band => String(row[band])),
                    String(row.totalOwn),
                    String(row.coAuthorship),
                    String(row.userPublications),
                    String(row.total),
                ]),
                note: fm(analytics.departments.help),
            },
            {
                title: fm(analytics.byCall),
                head: [fm(analytics.byCall), fm(analytics.journals.count)],
                rows: summary.userPublicationsByCall.map(row => [row.name, String(row.count)]),
                note: fm(analytics.linkHelp),
            },
            {
                title: fm(analytics.byDepartment),
                head: [fm(analytics.byDepartment), fm(analytics.journals.count)],
                rows: summary.userPublicationsByDepartment.map(row => [
                    row.name,
                    String(row.count),
                ]),
                note: fm(analytics.linkHelp),
            },
            {
                title: fm(analytics.bySystem),
                head: [fm(analytics.bySystem), fm(analytics.journals.count)],
                rows: summary.systemBreakdown.map(row => [row.name, String(row.count)]),
                note: fm(analytics.linkHelp),
            },
            {
                title: fm(analytics.journals.title),
                head: [fm(analytics.journals.name), fm(analytics.journals.count)],
                rows: summary.journalFrequencies.map(row => [row.name, String(row.count)]),
            },
            {
                title: fm(analytics.authors.title),
                head: [
                    fm(analytics.authors.name),
                    fm(analytics.authors.total),
                    fm(analytics.authors.first),
                    fm(analytics.authors.corresponding),
                    fm(analytics.authors.unknownFirst),
                    fm(analytics.authors.unknownCorresponding),
                ],
                rows: summary.topPublishingAuthors.map(row => [
                    row.name,
                    String(row.totalAuthorships),
                    String(row.firstAuthorCount),
                    String(row.correspondingCount),
                    String(row.unknownFirstAuthorCount),
                    String(row.unknownCorrespondingCount),
                ]),
                note: fm(analytics.authors.help),
            },
            {
                title: fm(analytics.trend.title),
                head: [fm(analytics.year), fm(analytics.quality.own), fm(analytics.quality.user)],
                rows: summary.q3q4HistoricalTrend.map(entry => [
                    String(entry.year),
                    percentCell(intl, entry.own),
                    percentCell(intl, entry.user),
                ]),
                note: fm(analytics.trend.help),
            },
        ],
    }
}

export const reportFileName = (summary: PublicationExecutiveSummary, extension: string) =>
    `publication-report-${summary.year}.${extension}`
