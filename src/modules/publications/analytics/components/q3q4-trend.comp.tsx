import { FormattedMessage, useIntl } from 'react-intl'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { message } from '@/i18n/src/messages'

import type { ReportingTrend } from '../types/executive-summary'

const { trend } = message.publicationsAnalytics

type Props = {
    data: ReportingTrend[]
}

/**
 * Q3+Q4 share over the trend window.
 *
 * A year with no ranked papers is a gap in the line, not a zero: the share is
 * unknown, and drawing it on the floor would assert that no paper was in the
 * bottom half when in fact nothing was measurable.
 */
export const Q3Q4Trend = ({ data }: Props) => {
    const { formatMessage: fm } = useIntl()

    const rows = data.map(entry => ({
        year: entry.year,
        own: entry.own.percent,
        user: entry.user.percent,
        ownRatio: entry.own,
        userRatio: entry.user,
    }))

    return (
        <section className="space-y-2" aria-label={fm({ id: trend.title })}>
            <h2 className="text-lg font-semibold">
                <FormattedMessage id={trend.title} />
            </h2>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={trend.help} />
            </p>
            <div className="h-72 w-full" data-testid="analytics-trend-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rows} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                        <CartesianGrid stroke="var(--viz-grid)" vertical={false} />
                        <XAxis dataKey="year" stroke="var(--viz-axis)" tick={{ fontSize: 11 }} />
                        <YAxis
                            stroke="var(--viz-axis)"
                            tick={{ fontSize: 11 }}
                            domain={[0, 100]}
                            unit="%"
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'var(--popover)',
                                border: '1px solid var(--border)',
                                borderRadius: 6,
                                color: 'var(--popover-foreground)',
                            }}
                            formatter={value =>
                                typeof value === 'number'
                                    ? `${value.toFixed(2)} %`
                                    : // A year with no ranked papers has no share
                                      // to report, so it reads N/A rather than 0 %.
                                      fm({ id: trend.notAvailable })
                            }
                        />
                        <Legend verticalAlign="top" height={28} />
                        <Line
                            type="monotone"
                            dataKey="own"
                            name={fm({ id: message.publicationsAnalytics.quality.own })}
                            stroke="var(--viz-series-own)"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            // A null year breaks the line rather than being bridged,
                            // so an unmeasurable year cannot read as a trend.
                            connectNulls={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="user"
                            name={fm({ id: message.publicationsAnalytics.quality.user })}
                            stroke="var(--viz-series-user)"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            connectNulls={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <table className="w-full text-sm">
                <caption className="sr-only">{fm({ id: trend.title })}</caption>
                <thead>
                    <tr className="border-b text-left text-muted-foreground">
                        <th className="py-1">{fm({ id: message.publicationsAnalytics.year })}</th>
                        <th className="py-1">
                            {fm({ id: message.publicationsAnalytics.quality.own })}
                        </th>
                        <th className="py-1">
                            {fm({ id: message.publicationsAnalytics.quality.user })}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(entry => (
                        <tr key={entry.year} className="border-b last:border-0">
                            <td className="py-1">{entry.year}</td>
                            <td className="py-1">
                                {entry.own.percent === null
                                    ? fm({ id: trend.noRanked })
                                    : `${entry.own.percent.toFixed(2)} % · ${fm({ id: trend.ratio }, { q3q4: entry.own.q3q4Count, ranked: entry.own.rankedCount })}`}
                            </td>
                            <td className="py-1">
                                {entry.user.percent === null
                                    ? fm({ id: trend.noRanked })
                                    : `${entry.user.percent.toFixed(2)} % · ${fm({ id: trend.ratio }, { q3q4: entry.user.q3q4Count, ranked: entry.user.rankedCount })}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
