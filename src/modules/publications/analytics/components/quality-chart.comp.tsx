import { FormattedMessage, useIntl } from 'react-intl'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { message } from '@/i18n/src/messages'

import { QUALITY_BANDS, type ReportingQualityCount } from '../types/executive-summary'
import { BAND_LABEL_IDS } from '../utils/labels'

const { quality } = message.publicationsAnalytics

type Props = {
    own: ReportingQualityCount[]
    user: ReportingQualityCount[]
}

/**
 * Own and user counts side by side across the quality bands.
 *
 * Grouped rather than stacked because user papers are a subset of own ones:
 * stacking them would imply a total that double-counts.
 */
export const QualityChart = ({ own, user }: Props) => {
    const { formatMessage: fm } = useIntl()

    const ownByBand = new Map(own.map(entry => [entry.quality, entry.count]))
    const userByBand = new Map(user.map(entry => [entry.quality, entry.count]))

    const data = QUALITY_BANDS.map(band => ({
        band: fm({ id: BAND_LABEL_IDS[band] }),
        own: ownByBand.get(band) ?? 0,
        user: userByBand.get(band) ?? 0,
    }))

    return (
        <section className="space-y-2" aria-label={fm({ id: quality.title })}>
            <h2 className="text-lg font-semibold">
                <FormattedMessage id={quality.title} />
            </h2>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={quality.help} />
            </p>
            <div className="h-80 w-full" data-testid="analytics-quality-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 8, right: 8, bottom: 40, left: 0 }}>
                        <CartesianGrid stroke="var(--viz-grid)" vertical={false} />
                        <XAxis
                            dataKey="band"
                            stroke="var(--viz-axis)"
                            tick={{ fontSize: 11 }}
                            angle={-35}
                            textAnchor="end"
                            interval={0}
                        />
                        <YAxis
                            stroke="var(--viz-axis)"
                            tick={{ fontSize: 11 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'var(--viz-grid)', fillOpacity: 0.4 }}
                            contentStyle={{
                                background: 'var(--popover)',
                                border: '1px solid var(--border)',
                                borderRadius: 6,
                                color: 'var(--popover-foreground)',
                            }}
                        />
                        <Legend verticalAlign="top" height={28} />
                        <Bar
                            dataKey="own"
                            name={fm({ id: quality.own })}
                            fill="var(--viz-series-own)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="user"
                            name={fm({ id: quality.user })}
                            fill="var(--viz-series-user)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}
