import { Plus, Trash2 } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import MultiCombobox from '@/components/form/MultiCombobox'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'
import { CODEBOOK } from '@/types/constants/codebook'

import { REPORTING_FIELD_NAME } from '../../hooks/useReportingFields'
import type { ReportingAuthor } from '../../types/reporting'
import { ReportingRoleSelect } from './reporting-role.select'

const { reporting } = message.publication

type Props = {
    disabled: boolean
}

/**
 * Reporting roles are recorded per publication, not per researcher: who led or
 * corresponded on a paper is a fact about that paper, and a researcher's later
 * moves must not rewrite it.
 */
export const ReportingAuthors = ({ disabled }: Props) => {
    const { formatMessage: fm } = useIntl()
    const { getValues, setValue } = useFormContext()

    const authors = (useWatch({ name: `${REPORTING_FIELD_NAME}.authors` }) ??
        []) as ReportingAuthor[]
    const researchers = (useWatch({ name: 'eliResearchers' }) ?? []) as SelectedResearcher[]

    const updateAuthors = (next: ReportingAuthor[]) =>
        setValue(`${REPORTING_FIELD_NAME}.authors`, next, {
            shouldDirty: true,
            shouldValidate: true,
        })

    const addAuthor = (researcherUid: string) =>
        updateAuthors([
            ...(getValues(`${REPORTING_FIELD_NAME}.authors`) ?? []),
            {
                researcherUid,
                departmentUids: [],
                isFirstAuthor: null,
                isCorresponding: null,
            },
        ])

    const removeAuthor = (index: number) =>
        updateAuthors(authors.filter((_, position) => position !== index))

    const unlisted = researchers.filter(
        researcher => !authors.some(author => author.researcherUid === researcher.uid),
    )

    return (
        <section className="space-y-3" aria-label={fm({ id: reporting.authorsTitle })}>
            <h3 className="font-medium">
                <FormattedMessage id={reporting.authorsTitle} />
            </h3>
            <p className="text-xs text-muted-foreground">
                <FormattedMessage id={reporting.authorsHelp} />
            </p>

            {authors.map((author, index) => {
                const researcher = researchers.find(item => item.uid === author.researcherUid)
                return (
                    <div key={author.researcherUid} className="space-y-3 rounded border p-3">
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-medium">
                                {researcher
                                    ? `${researcher.lastName}, ${researcher.firstName}`
                                    : fm(
                                          { id: reporting.unknownResearcher },
                                          { uid: author.researcherUid },
                                      )}
                            </p>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => removeAuthor(index)}
                                    aria-label={fm({ id: reporting.removeAuthor })}
                                    className="text-red-600 hover:text-orange-400 dark:text-gray-400 dark:hover:text-orange-600"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <ReportingRoleSelect
                                name={`${REPORTING_FIELD_NAME}.authors.${index}.isFirstAuthor`}
                                label={fm({ id: reporting.firstAuthor })}
                                disabled={disabled}
                            />
                            <ReportingRoleSelect
                                name={`${REPORTING_FIELD_NAME}.authors.${index}.isCorresponding`}
                                label={fm({ id: reporting.correspondingAuthor })}
                                disabled={disabled}
                            />
                        </div>

                        <MultiCombobox
                            name={`${REPORTING_FIELD_NAME}.authors.${index}.departmentUids`}
                            customLabel={fm({ id: reporting.authorDepartments })}
                            codebook={CODEBOOK.DEPARTMENT}
                            disabled={disabled}
                        />
                    </div>
                )
            })}

            {!disabled &&
                unlisted.map(researcher => (
                    <Button
                        key={researcher.uid}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addAuthor(researcher.uid)}
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        {fm(
                            { id: reporting.addAuthor },
                            { name: `${researcher.lastName}, ${researcher.firstName}` },
                        )}
                    </Button>
                ))}
        </section>
    )
}
