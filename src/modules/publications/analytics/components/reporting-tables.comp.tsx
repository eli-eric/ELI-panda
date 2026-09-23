import { FormattedMessage, useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { ReportingAuthorStats, ReportingCount } from '../types/executive-summary'

const { journals, authors } = message.publicationsAnalytics

export const JournalFrequencies = ({ rows }: { rows: ReportingCount[] }) => {
    const { formatMessage: fm } = useIntl()
    return (
        <section className="space-y-2" aria-label={fm({ id: journals.title })}>
            <h2 className="text-lg font-semibold">
                <FormattedMessage id={journals.title} />
            </h2>
            {rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    <FormattedMessage id={message.common.ui.noDataAvailable} />
                </p>
            ) : (
                <table className="w-full text-sm" data-testid="analytics-journals">
                    <thead>
                        <tr className="border-b text-left text-muted-foreground">
                            <th className="py-1">{fm({ id: journals.name })}</th>
                            <th className="py-1 text-right">{fm({ id: journals.count })}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row.uid} className="border-b last:border-0">
                                <td className="py-1">{row.name}</td>
                                <td className="py-1 text-right">{row.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    )
}

export const TopAuthors = ({ rows }: { rows: ReportingAuthorStats[] }) => {
    const { formatMessage: fm } = useIntl()
    return (
        <section className="space-y-2" aria-label={fm({ id: authors.title })}>
            <h2 className="text-lg font-semibold">
                <FormattedMessage id={authors.title} />
            </h2>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={authors.help} />
            </p>
            {rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    <FormattedMessage id={message.common.ui.noDataAvailable} />
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm" data-testid="analytics-authors">
                        <thead>
                            <tr className="border-b text-left text-muted-foreground">
                                <th className="py-1 pr-3">{fm({ id: authors.name })}</th>
                                <th className="py-1 px-2 text-right">
                                    {fm({ id: authors.total })}
                                </th>
                                <th className="py-1 px-2 text-right">
                                    {fm({ id: authors.first })}
                                </th>
                                <th className="py-1 px-2 text-right">
                                    {fm({ id: authors.corresponding })}
                                </th>
                                <th className="py-1 px-2 text-right">
                                    {fm({ id: authors.unknownFirst })}
                                </th>
                                <th className="py-1 px-2 text-right">
                                    {fm({ id: authors.unknownCorresponding })}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => (
                                <tr key={row.researcherUid} className="border-b last:border-0">
                                    <td className="py-1 pr-3">{row.name}</td>
                                    <td className="py-1 px-2 text-right">{row.totalAuthorships}</td>
                                    <td className="py-1 px-2 text-right">{row.firstAuthorCount}</td>
                                    <td className="py-1 px-2 text-right">
                                        {row.correspondingCount}
                                    </td>
                                    <td className="py-1 px-2 text-right text-muted-foreground">
                                        {row.unknownFirstAuthorCount}
                                    </td>
                                    <td className="py-1 px-2 text-right text-muted-foreground">
                                        {row.unknownCorrespondingCount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}
