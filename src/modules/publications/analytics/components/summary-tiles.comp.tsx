import { FormattedMessage, useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { PublicationExecutiveSummary } from '../types/executive-summary'

const { totals } = message.publicationsAnalytics

type Props = {
    summary: PublicationExecutiveSummary
}

const Tile = ({ label, value, muted }: { label: string; value: number; muted?: boolean }) => (
    <div className="rounded border p-3">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-2xl font-semibold ${muted ? 'text-muted-foreground' : ''}`}>{value}</p>
    </div>
)

/**
 * Headline counts.
 *
 * The backlog line is deliberately as prominent as the totals: on a freshly
 * migrated database every record is unclassified, and a dashboard that showed
 * only the classified figures would read as a complete report of almost nothing.
 */
export const SummaryTiles = ({ summary }: Props) => {
    const { formatMessage: fm } = useIntl()

    const hasBacklog = summary.unclassifiedPublications > 0 || summary.pendingReviewPublications > 0

    return (
        <section className="space-y-2" aria-label={fm({ id: totals.title })}>
            <h2 className="text-lg font-semibold">
                <FormattedMessage id={totals.title} />
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <Tile label={fm({ id: totals.total })} value={summary.totalPublications} />
                <Tile label={fm({ id: totals.own })} value={summary.totalOwnPublications} />
                <Tile label={fm({ id: totals.user })} value={summary.totalUserPublications} />
                <Tile label={fm({ id: totals.other })} value={summary.otherPublications} />
                <Tile
                    label={fm({ id: totals.coauthorship })}
                    value={summary.coauthorshipPublications}
                />
                <Tile
                    label={fm({ id: totals.unclassified })}
                    value={summary.unclassifiedPublications}
                    muted
                />
            </div>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={totals.distinctHint} />
            </p>
            {hasBacklog && (
                <p
                    className="rounded border border-amber-500/50 p-2 text-sm"
                    data-testid="analytics-backlog"
                >
                    <FormattedMessage
                        id={totals.backlogHint}
                        values={{
                            unclassified: summary.unclassifiedPublications,
                            total: summary.totalPublications,
                            pending: summary.pendingReviewPublications,
                        }}
                    />
                </p>
            )}
        </section>
    )
}
