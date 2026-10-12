import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { usePublicationExecutiveSummary } from '../hooks/usePublicationExecutiveSummary'
import { PublicationsAnalyticsContainer } from '../publications-analytics.cont'
import type { PublicationExecutiveSummary } from '../types/executive-summary'

jest.mock('../hooks/usePublicationExecutiveSummary', () => ({
    usePublicationExecutiveSummary: jest.fn(),
}))

// Recharts needs a measured container, which jsdom never provides.
jest.mock('recharts', () => {
    const Stub = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
    return {
        ResponsiveContainer: Stub,
        BarChart: Stub,
        LineChart: Stub,
        CartesianGrid: () => null,
        XAxis: () => null,
        YAxis: () => null,
        Tooltip: () => null,
        Legend: () => null,
        Bar: () => null,
        Line: () => null,
    }
})

const mockUseSummary = usePublicationExecutiveSummary as jest.Mock

const emptySummary = (overrides: Partial<PublicationExecutiveSummary> = {}) =>
    ({
        year: 2025,
        startYear: 2019,
        endYear: 2025,
        generatedAt: '2026-01-02T03:04:05Z',
        policyVersion: 'v1',
        totalPublications: 0,
        totalOwnPublications: 0,
        totalUserPublications: 0,
        otherPublications: 0,
        coauthorshipPublications: 0,
        unclassifiedPublications: 0,
        pendingReviewPublications: 0,
        departmentMatrix: [],
        ownQuality: [],
        userQuality: [],
        userPublicationsByCall: [],
        userPublicationsByDepartment: [],
        systemBreakdown: [],
        journalFrequencies: [],
        topPublishingAuthors: [],
        q3q4HistoricalTrend: [],
        ...overrides,
    }) as PublicationExecutiveSummary

describe('PublicationsAnalyticsContainer', () => {
    it('shows no figures at all when the report could not be calculated', () => {
        mockUseSummary.mockReturnValue({ data: undefined, isLoading: false, isError: true })

        renderWithProviders(<PublicationsAnalyticsContainer />)

        expect(screen.getByTestId('analytics-error')).toBeInTheDocument()
        // A partial report would look like a complete one, so nothing is rendered.
        expect(screen.queryByTestId('analytics-department-matrix')).not.toBeInTheDocument()
    })

    it('surfaces the unreviewed backlog beside the totals', () => {
        mockUseSummary.mockReturnValue({
            data: emptySummary({
                totalPublications: 10,
                totalOwnPublications: 3,
                unclassifiedPublications: 7,
                pendingReviewPublications: 8,
            }),
            isLoading: false,
            isError: false,
        })

        renderWithProviders(<PublicationsAnalyticsContainer />)

        const backlog = screen.getByTestId('analytics-backlog')
        expect(backlog).toHaveTextContent('7 of 10')
        expect(backlog).toHaveTextContent('8 are awaiting review')
    })

    it('says the year is empty rather than drawing empty charts', () => {
        mockUseSummary.mockReturnValue({
            data: emptySummary(),
            isLoading: false,
            isError: false,
        })

        renderWithProviders(<PublicationsAnalyticsContainer />)

        expect(screen.getByText(/No publications are recorded for 2025/)).toBeInTheDocument()
        expect(screen.queryByTestId('analytics-quality-chart')).not.toBeInTheDocument()
    })

    it('renders the reports once there are records, and offers both downloads', () => {
        mockUseSummary.mockReturnValue({
            data: emptySummary({
                totalPublications: 2,
                totalOwnPublications: 2,
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
                        totalOwn: 2,
                        coAuthorship: 0,
                        total: 2,
                        userPublications: 0,
                    },
                ],
            }),
            isLoading: false,
            isError: false,
        })

        renderWithProviders(<PublicationsAnalyticsContainer />)

        expect(screen.getByTestId('analytics-department-matrix')).toBeInTheDocument()
        expect(screen.getByTestId('analytics-quality-chart')).toBeInTheDocument()
        expect(screen.getByTestId('export-report-docx')).toBeInTheDocument()
        expect(screen.getByTestId('export-report-pdf')).toBeInTheDocument()
    })
})
