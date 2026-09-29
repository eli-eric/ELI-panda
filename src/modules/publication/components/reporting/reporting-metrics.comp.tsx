import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { REPORTING_FIELD_NAME } from '../../hooks/useReportingFields'

const { reporting } = message.publication

const QUARTILES = ['Q1', 'Q2', 'Q3', 'Q4']

type Props = {
    disabled: boolean
    publicationYear?: string
}

/**
 * JCR evidence is entered per category, because a journal is ranked in every
 * category it belongs to and the bands differ between them. The highest
 * percentile for the publication year decides the reported band, so every
 * applicable category belongs here rather than only the flattering one.
 */
export const ReportingMetrics = ({ disabled, publicationYear }: Props) => {
    const { formatMessage: fm } = useIntl()
    const { fields, append, remove } = useFieldArray({
        name: `${REPORTING_FIELD_NAME}.journalMetrics`,
    })

    const addMetric = () =>
        append({
            source: 'JCR',
            journalId: '',
            // The metric year follows the publication year, since a paper is
            // reported against its own year's ranking.
            year: Number(publicationYear) || new Date().getFullYear() - 1,
            category: '',
            quartile: 'Q1',
            percentile: null,
            impactFactor: null,
        })

    return (
        <section className="space-y-3" aria-label={fm({ id: reporting.metricsTitle })}>
            <h3 className="font-medium">
                <FormattedMessage id={reporting.metricsTitle} />
            </h3>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={reporting.metricsHelp} />
            </p>

            {fields.map((item, index) => (
                <div key={item.id} className="grid gap-3 rounded border p-3 sm:grid-cols-3">
                    <Input
                        name={`${REPORTING_FIELD_NAME}.journalMetrics.${index}.year`}
                        label={fm({ id: reporting.metricYear })}
                        type="number"
                        rounded="rounded-md"
                        disabled={disabled}
                    />
                    <Input
                        name={`${REPORTING_FIELD_NAME}.journalMetrics.${index}.category`}
                        label={fm({ id: reporting.metricCategory })}
                        rounded="rounded-md"
                        disabled={disabled}
                    />
                    <Input
                        name={`${REPORTING_FIELD_NAME}.journalMetrics.${index}.journalId`}
                        label={fm({ id: reporting.metricJournalId })}
                        rounded="rounded-md"
                        disabled={disabled}
                    />
                    <Listbox
                        name={`${REPORTING_FIELD_NAME}.journalMetrics.${index}.quartile`}
                        customLabel={fm({ id: reporting.metricQuartile })}
                        customOptions={QUARTILES}
                        disabled={disabled}
                    />
                    <Input
                        name={`${REPORTING_FIELD_NAME}.journalMetrics.${index}.percentile`}
                        label={fm({ id: reporting.metricPercentile })}
                        placeholder={fm({ id: reporting.metricBlankUnknown })}
                        type="number"
                        rounded="rounded-md"
                        disabled={disabled}
                    />
                    <Input
                        name={`${REPORTING_FIELD_NAME}.journalMetrics.${index}.impactFactor`}
                        label={fm({ id: reporting.metricImpactFactor })}
                        placeholder={fm({ id: reporting.metricBlankUnknown })}
                        type="number"
                        rounded="rounded-md"
                        disabled={disabled}
                    />
                    {!disabled && (
                        <div className="sm:col-span-3">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                aria-label={fm({ id: reporting.removeMetric })}
                                className="text-red-600 hover:text-orange-400 dark:text-gray-400 dark:hover:text-orange-600"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {!disabled && (
                <Button type="button" variant="outline" size="sm" onClick={addMetric}>
                    <Plus className="mr-1 h-4 w-4" />
                    <FormattedMessage id={reporting.addMetric} />
                </Button>
            )}
        </section>
    )
}
