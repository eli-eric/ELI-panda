import { AlertTriangle, CheckCircle2, CircleSlash, HelpCircle, MinusCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { message } from '@/i18n/src/messages'

import {
    ENRICHMENT_PROVIDER_LABEL_IDS,
    ENRICHMENT_STATE_LABEL_IDS,
    type EnrichmentConflict,
    type EnrichmentOpenAccess,
    type EnrichmentSourceState,
    type EnrichmentSourceStatus,
} from '../../types/enrichment'
import { WOS_FIELD_LABEL_IDS } from '../../types/wos-import'
import { safeHttpUrl } from '../../utils/safe-http-url'

const { enrichment } = message.publication

const STATE_ICONS: Record<EnrichmentSourceState, ReactNode> = {
    ok: <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />,
    error: <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />,
    'not-found': <CircleSlash className="h-4 w-4 text-muted-foreground" aria-hidden="true" />,
    'not-configured': <MinusCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />,
    ambiguous: <HelpCircle className="h-4 w-4 text-amber-600" aria-hidden="true" />,
    skipped: <MinusCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />,
}

const formatValue = (value: unknown) =>
    value === null || value === undefined || value === '' ? '—' : String(value)

type Props = {
    sources: EnrichmentSourceStatus[]
    conflicts: EnrichmentConflict[]
    openAccess?: EnrichmentOpenAccess
    datePrecision?: 'year' | 'month' | 'day'
}

/**
 * Shows what each provider actually answered.
 *
 * Which sources were silent matters as much as the values: a field left blank
 * because Crossref had nothing is different from one blank because Web of
 * Science was never configured, and only the first is worth retrying.
 */
export const EnrichmentSources = ({ sources, conflicts, openAccess, datePrecision }: Props) => {
    const { formatMessage: fm } = useIntl()

    const providerLabel = (provider: string) =>
        ENRICHMENT_PROVIDER_LABEL_IDS[provider]
            ? fm({ id: ENRICHMENT_PROVIDER_LABEL_IDS[provider] })
            : provider

    const fieldLabel = (field: string) =>
        WOS_FIELD_LABEL_IDS[field] ? fm({ id: WOS_FIELD_LABEL_IDS[field] }) : field

    return (
        <section className="space-y-3" aria-label={fm({ id: enrichment.sourcesTitle })}>
            <div>
                <h3 className="font-medium">
                    <FormattedMessage id={enrichment.sourcesTitle} />
                </h3>
                <p className="text-xs text-muted-foreground">
                    <FormattedMessage id={enrichment.sourcesHelp} />
                </p>
            </div>

            <ul className="space-y-1" data-testid="enrichment-sources">
                {sources.map(source => (
                    <li key={source.provider} className="flex items-center gap-2 text-sm">
                        {STATE_ICONS[source.status] ?? STATE_ICONS.skipped}
                        <span className="font-medium">{providerLabel(source.provider)}</span>
                        <span className="text-muted-foreground">
                            {ENRICHMENT_STATE_LABEL_IDS[source.status]
                                ? fm({ id: ENRICHMENT_STATE_LABEL_IDS[source.status] })
                                : source.status}
                        </span>
                        {source.retryable && source.retryAfter && (
                            <Badge variant="secondary">
                                <FormattedMessage
                                    id={enrichment.retryAfter}
                                    values={{ seconds: source.retryAfter }}
                                />
                            </Badge>
                        )}
                    </li>
                ))}
            </ul>

            {datePrecision && (
                <p className="text-xs text-muted-foreground">
                    <FormattedMessage id={enrichment.datePrecision[datePrecision]} />
                </p>
            )}

            {openAccess && (
                <div className="space-y-1 rounded border p-3">
                    <h4 className="text-sm font-medium">
                        <FormattedMessage id={enrichment.openAccessTitle} />
                    </h4>
                    <p className="text-sm">
                        <FormattedMessage
                            id={enrichment.openAccessStatus}
                            values={{ status: openAccess.status }}
                        />
                    </p>
                    <p className="text-xs text-muted-foreground">
                        <FormattedMessage id={enrichment.openAccessHelp} />
                    </p>
                    <div className="flex gap-3 text-sm">
                        {safeHttpUrl(openAccess.url) && (
                            <a
                                href={safeHttpUrl(openAccess.url)}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline"
                            >
                                <FormattedMessage id={enrichment.openAccessLink} />
                            </a>
                        )}
                        {safeHttpUrl(openAccess.pdfUrl) && (
                            <a
                                href={safeHttpUrl(openAccess.pdfUrl)}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline"
                            >
                                <FormattedMessage id={enrichment.openAccessPdf} />
                            </a>
                        )}
                    </div>
                </div>
            )}

            {conflicts.length > 0 && (
                <div className="space-y-1 rounded border border-amber-500/50 p-3">
                    <h4 className="text-sm font-medium">
                        <FormattedMessage id={enrichment.conflictsTitle} />
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        <FormattedMessage id={enrichment.conflictsHelp} />
                    </p>
                    <ul className="space-y-1 text-sm" data-testid="enrichment-conflicts">
                        {conflicts.map(conflict => (
                            <li key={conflict.field}>
                                <FormattedMessage
                                    id={enrichment.conflictRow}
                                    values={{
                                        field: fieldLabel(conflict.field),
                                        selected: formatValue(conflict.selectedValue),
                                        selectedProvider: providerLabel(conflict.selectedProvider),
                                        alternative: formatValue(conflict.alternativeValue),
                                        alternativeProvider: providerLabel(
                                            conflict.alternativeProvider,
                                        ),
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
