import { FormattedMessage, useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { type DepartmentReportingRow,QUALITY_BANDS } from '../types/executive-summary'
import { BAND_LABEL_IDS } from '../utils/labels'

const { departments } = message.publicationsAnalytics

type Props = {
    rows: DepartmentReportingRow[]
}

/**
 * The department quality matrix.
 *
 * A table rather than a chart: eleven quality bands across every department is
 * more columns than a chart can carry legibly, and the numbers themselves are
 * what the reporting conversation is about.
 */
export const DepartmentMatrix = ({ rows }: Props) => {
    const { formatMessage: fm } = useIntl()

    if (!rows.length) {
        return (
            <section className="space-y-2" aria-label={fm({ id: departments.title })}>
                <h2 className="text-lg font-semibold">
                    <FormattedMessage id={departments.title} />
                </h2>
                <p className="text-sm text-muted-foreground">
                    <FormattedMessage id={message.common.ui.noDataAvailable} />
                </p>
            </section>
        )
    }

    return (
        <section className="space-y-2" aria-label={fm({ id: departments.title })}>
            <h2 className="text-lg font-semibold">
                <FormattedMessage id={departments.title} />
            </h2>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={departments.help} />
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="analytics-department-matrix">
                    <thead>
                        <tr className="border-b text-left text-muted-foreground">
                            <th className="py-1 pr-3">{fm({ id: departments.name })}</th>
                            {QUALITY_BANDS.map(band => (
                                <th key={band} className="py-1 px-2 text-right">
                                    {fm({ id: BAND_LABEL_IDS[band] })}
                                </th>
                            ))}
                            <th className="py-1 px-2 text-right">
                                {fm({ id: departments.totalOwn })}
                            </th>
                            <th className="py-1 px-2 text-right">
                                {fm({ id: departments.coAuthorship })}
                            </th>
                            <th className="py-1 px-2 text-right">
                                {fm({ id: departments.userPublications })}
                            </th>
                            <th className="py-1 px-2 text-right">
                                {fm({ id: departments.total })}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row.uid} className="border-b last:border-0">
                                <td className="py-1 pr-3">{row.name}</td>
                                {QUALITY_BANDS.map(band => (
                                    <td key={band} className="py-1 px-2 text-right">
                                        {row[band]}
                                    </td>
                                ))}
                                <td className="py-1 px-2 text-right">{row.totalOwn}</td>
                                <td className="py-1 px-2 text-right">{row.coAuthorship}</td>
                                <td className="py-1 px-2 text-right">{row.userPublications}</td>
                                <td className="py-1 px-2 text-right font-medium">{row.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
