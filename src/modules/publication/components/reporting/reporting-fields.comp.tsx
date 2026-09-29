import { useFormContext, useWatch } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import CheckBox from '@/components/form/CheckBox'
import Listbox from '@/components/form/Listbox'
import MultiCombobox from '@/components/form/MultiCombobox'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { REPORTING_FIELD_NAME, useReportingFields } from '../../hooks/useReportingFields'
import type {
    PublicationReporting,
    ReportingClassification,
    ReportingDocumentType,
} from '../../types/reporting'
import { createPublicationReporting } from '../../types/reporting'
import { ReportingAuthors } from './reporting-authors.comp'
import { ReportingMetrics } from './reporting-metrics.comp'

const { reporting } = message.publication

// Wire values are kebab-case; message ids stay camelCase per the dictionary
// convention enforced by i18n/src/__tests__/messages.spec.ts.
const CLASSIFICATION_LABEL_IDS: Record<ReportingClassification, string> = {
    unclassified: reporting.classificationOptions.unclassified,
    'own-user': reporting.classificationOptions.ownUser,
    'own-other': reporting.classificationOptions.ownOther,
    coauthorship: reporting.classificationOptions.coauthorship,
}

const DOCUMENT_TYPE_LABEL_IDS: Record<ReportingDocumentType, string> = {
    unknown: reporting.documentTypeOptions.unknown,
    article: reporting.documentTypeOptions.article,
    proceedings: reporting.documentTypeOptions.proceedings,
    'book-chapter': reporting.documentTypeOptions.bookChapter,
    other: reporting.documentTypeOptions.other,
}

const CLASSIFICATIONS = Object.keys(CLASSIFICATION_LABEL_IDS) as ReportingClassification[]
const DOCUMENT_TYPES = Object.keys(DOCUMENT_TYPE_LABEL_IDS) as ReportingDocumentType[]

const RANKING_STATUSES = ['unknown', 'unranked'] as const

const ReportingEditor = () => {
    const { formatMessage: fm } = useIntl()
    const fields = useReportingFields()
    const disabled = !!fields.classification.disabled

    const publicationYear = useWatch({ name: 'yearOfPublication' }) as string | undefined
    const reviewedAt = useWatch({ name: `${REPORTING_FIELD_NAME}.reviewedAt` }) as
        | string
        | undefined

    const classificationOptions = CLASSIFICATIONS.map(value => ({
        uid: value,
        name: fm({ id: CLASSIFICATION_LABEL_IDS[value] }),
    }))
    const documentTypeOptions = DOCUMENT_TYPES.map(value => ({
        uid: value,
        name: fm({ id: DOCUMENT_TYPE_LABEL_IDS[value] }),
    }))
    const rankingOptions = RANKING_STATUSES.map(value => ({
        uid: value,
        name: fm({
            id: value === 'unranked' ? reporting.rankingUnranked : reporting.rankingUnknown,
        }),
    }))

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <Listbox {...fields.classification} customOptions={classificationOptions} />
                <Listbox {...fields.documentType} customOptions={documentTypeOptions} />
            </div>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={reporting.classificationHelp} />
            </p>

            <MultiCombobox
                {...fields.departmentUids}
                description={fm({ id: reporting.departmentsHelp })}
            />

            <div className="grid gap-3 sm:grid-cols-3">
                <MultiCombobox {...fields.userCallUids} />
                <MultiCombobox {...fields.userExperimentUids} />
                <MultiCombobox {...fields.experimentalSystemUids} />
            </div>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={reporting.linksHelp} />
            </p>

            <ReportingAuthors disabled={disabled} />

            <ReportingMetrics disabled={disabled} publicationYear={publicationYear} />
            <Listbox {...fields.journalRankingStatus} customOptions={rankingOptions} />

            <div className="space-y-1 rounded border p-3">
                <CheckBox {...fields.reviewed} />
                <p className="text-xs text-muted-foreground">
                    <FormattedMessage id={reporting.reviewedHelp} />
                </p>
                {reviewedAt && (
                    <p className="text-xs text-muted-foreground">
                        <FormattedMessage id={reporting.lastReview} values={{ at: reviewedAt }} />
                    </p>
                )}
            </div>
        </div>
    )
}

/**
 * Reporting is a deliberate review, so the fieldset stays collapsed until an
 * editor opens it. A record nobody has reviewed is reported as unclassified
 * rather than being given defaults that would read as a decision.
 */
export const PublicationReportingFields = () => {
    const {
        setValue,
        formState: { errors },
    } = useFormContext()
    const reportingValue = useWatch({ name: REPORTING_FIELD_NAME }) as
        | PublicationReporting
        | null
        | undefined

    return (
        <fieldset
            className="space-y-4 rounded border p-4"
            data-testid="publication-reporting-fields"
        >
            <legend className="px-2 font-semibold">
                <FormattedMessage id={reporting.title} />
            </legend>
            <p className="text-sm text-muted-foreground">
                <FormattedMessage id={reporting.intro} />
            </p>

            {reportingValue ? (
                <ReportingEditor />
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    data-testid="start-reporting-review"
                    onClick={() =>
                        setValue(REPORTING_FIELD_NAME, createPublicationReporting(), {
                            shouldDirty: true,
                        })
                    }
                >
                    <FormattedMessage id={reporting.start} />
                </Button>
            )}

            {errors[REPORTING_FIELD_NAME] && (
                <p role="alert" className="text-sm text-red-600">
                    <FormattedMessage id={reporting.invalid} />
                </p>
            )}
        </fieldset>
    )
}
