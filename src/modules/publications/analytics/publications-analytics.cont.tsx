import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import Card from '@/components/layout/Card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'

import { DepartmentMatrix } from './components/department-matrix.comp'
import { ExportButtons } from './components/export-buttons.comp'
import { LinkBreakdown } from './components/link-breakdown.comp'
import { Q3Q4Trend } from './components/q3q4-trend.comp'
import { QualityChart } from './components/quality-chart.comp'
import { JournalFrequencies, TopAuthors } from './components/reporting-tables.comp'
import { SummaryTiles } from './components/summary-tiles.comp'
import { usePublicationExecutiveSummary } from './hooks/usePublicationExecutiveSummary'
import { defaultReportWindow, type ExecutiveSummaryQuery } from './types/executive-summary'

const analytics = message.publicationsAnalytics

const YearInput = ({
    label,
    value,
    onChange,
}: {
    label: string
    value: number
    onChange: (value: number) => void
}) => (
    <div className="space-y-1">
        <Label>{label}</Label>
        <Input
            type="number"
            min={1900}
            max={9999}
            value={value}
            onChange={event => onChange(Number(event.target.value))}
            className="w-28"
        />
    </div>
)

/**
 * Management reporting dashboard.
 *
 * A failed query renders an error and no figures at all. Showing the sections
 * that happened to load would produce a report that looks complete but silently
 * under-counts, which is worse than showing nothing.
 */
export const PublicationsAnalyticsContainer = () => {
    const { formatMessage: fm } = useIntl()
    const [window, setWindow] = useState<ExecutiveSummaryQuery>(() => defaultReportWindow())

    const { data: summary, isLoading, isError } = usePublicationExecutiveSummary(window)

    const update = (patch: Partial<ExecutiveSummaryQuery>) =>
        setWindow(current => ({ ...current, ...patch }))

    return (
        <Card>
            <div className="space-y-6" data-testid="publications-analytics">
                <header className="space-y-2">
                    <h1 className="text-xl font-semibold">
                        <FormattedMessage id={analytics.title} />
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        <FormattedMessage id={analytics.intro} />
                    </p>
                </header>

                <div className="flex flex-wrap items-end gap-3">
                    <YearInput
                        label={fm({ id: analytics.year })}
                        value={window.year}
                        onChange={year => update({ year })}
                    />
                    <YearInput
                        label={fm({ id: analytics.trendFrom })}
                        value={window.startYear}
                        onChange={startYear => update({ startYear })}
                    />
                    <YearInput
                        label={fm({ id: analytics.trendTo })}
                        value={window.endYear}
                        onChange={endYear => update({ endYear })}
                    />
                </div>

                {isLoading && (
                    <p className="text-sm text-muted-foreground">
                        <FormattedMessage id={analytics.loading} />
                    </p>
                )}

                {isError && (
                    <p
                        role="alert"
                        className="rounded border border-destructive/50 p-3 text-sm"
                        data-testid="analytics-error"
                    >
                        <FormattedMessage id={analytics.error} />
                    </p>
                )}

                {summary && !isError && (
                    <>
                        <ExportButtons summary={summary} />
                        <SummaryTiles summary={summary} />

                        {summary.totalPublications === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                <FormattedMessage
                                    id={analytics.empty}
                                    values={{ year: summary.year }}
                                />
                            </p>
                        ) : (
                            <>
                                <QualityChart own={summary.ownQuality} user={summary.userQuality} />
                                <DepartmentMatrix rows={summary.departmentMatrix} />
                                <div className="grid gap-6 lg:grid-cols-3">
                                    <LinkBreakdown
                                        titleId={analytics.byCall}
                                        data={summary.userPublicationsByCall}
                                    />
                                    <LinkBreakdown
                                        titleId={analytics.byDepartment}
                                        data={summary.userPublicationsByDepartment}
                                    />
                                    <LinkBreakdown
                                        titleId={analytics.bySystem}
                                        data={summary.systemBreakdown}
                                    />
                                </div>
                                <JournalFrequencies rows={summary.journalFrequencies} />
                                <TopAuthors rows={summary.topPublishingAuthors} />
                            </>
                        )}

                        <Q3Q4Trend data={summary.q3q4HistoricalTrend} />

                        <p className="text-xs text-muted-foreground">
                            <FormattedMessage
                                id={analytics.generated}
                                values={{
                                    at: summary.generatedAt,
                                    version: summary.policyVersion,
                                }}
                            />
                        </p>
                    </>
                )}
            </div>
        </Card>
    )
}
