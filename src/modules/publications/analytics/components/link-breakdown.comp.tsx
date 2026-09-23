import { FormattedMessage, useIntl } from 'react-intl'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { message } from '@/i18n/src/messages'

import { type ReportingCount, UNLINKED_UID } from '../types/executive-summary'

const { linkHelp } = message.publicationsAnalytics

type Props = {
    titleId: string
    data: ReportingCount[]
}

/**
 * One breakdown of user publications — by call, department or system.
 *
 * A single series, so no legend: the heading names it. The unlinked bucket is
 * drawn in the neutral colour rather than the series colour, because it counts
 * papers the report has no evidence about rather than another category.
 */
export const LinkBreakdown = ({ titleId, data }: Props) => {
    const { formatMessage: fm } = useIntl()

    const rows = data.map(entry => ({
        name: entry.name,
        count: entry.count,
        unlinked: entry.uid === UNLINKED_UID,
    }))

    return (
        <section className="space-y-2" aria-label={fm({ id: titleId })}>
            <h3 className="font-semibold">
                <FormattedMessage id={titleId} />
            </h3>
            {rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    <FormattedMessage id={message.common.ui.noDataAvailable} />
                </p>
            ) : (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={rows}
                            layout="vertical"
                            margin={{ top: 4, right: 24, bottom: 4, left: 8 }}
                        >
                            <CartesianGrid stroke="var(--viz-grid)" horizontal={false} />
                            <XAxis
                                type="number"
                                stroke="var(--viz-axis)"
                                tick={{ fontSize: 11 }}
                                allowDecimals={false}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                stroke="var(--viz-axis)"
                                tick={{ fontSize: 11 }}
                                width={140}
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
                            <Bar
                                dataKey="count"
                                radius={[0, 4, 4, 0]}
                                label={{ position: 'right', fill: 'var(--viz-axis)', fontSize: 11 }}
                            >
                                {rows.map(row => (
                                    <Cell
                                        key={row.name}
                                        fill={
                                            row.unlinked
                                                ? 'var(--viz-neutral)'
                                                : 'var(--viz-series-own)'
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={linkHelp} />
            </p>
        </section>
    )
}
