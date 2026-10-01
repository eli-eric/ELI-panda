import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { FilterCheckboxes } from '@/components/form/FIlterCheckboxes'
import { Input } from '@/components/form/inputs'
import { RangeInput } from '@/components/form/RangeInput'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'

import { usePublicationFilterOptions } from '../hooks/usePublicationFilterOptions'
import {
    PUBLICATION_ELI_FLAGS,
    PUBLICATION_QUARTILES,
    publicationFilterYears,
    usePublicationsFilterFields,
} from './PublicationsFilter.fields'

const filters = message.publicationsPage.filters

interface Props {
    tableId: string
    enableQueryUrl: boolean
}

/**
 * The publication table exposes ~38 columns, so the sheet groups the fields
 * rather than listing them flat — otherwise the long list is unusable.
 */
export const PublicationsFilterForm = ({ tableId, enableQueryUrl }: Props) => {
    const { formatMessage: fm } = useIntl()
    const fields = usePublicationsFilterFields()
    const { setFilter } = useFormFilterState({ tableId, enableQueryUrl })
    const { researcherOptions, grantOptions } = usePublicationFilterOptions()

    const range = { min: fm({ id: filters.rangeMin }), max: fm({ id: filters.rangeMax }) }
    // Dates are compared as text server-side, so a partial YYYY or YYYY-MM bound
    // works as well as a full date; say so rather than forcing a picker.
    const dateRange = { min: 'YYYY-MM-DD', max: 'YYYY-MM-DD' }

    const section = (titleId: string, children: React.ReactNode) => (
        <section className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {fm({ id: titleId })}
            </h3>
            {children}
        </section>
    )

    const text = (
        field: ReturnType<typeof usePublicationsFilterFields>[keyof ReturnType<
            typeof usePublicationsFilterFields
        >],
    ) => <Input {...field} onChange={setFilter(field.name)} isFilter={true} />

    return (
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-6 md:min-w-[560px]">
            {section(
                filters.sections.identification,
                <>
                    {text(fields.title)}
                    {text(fields.code)}
                    {text(fields.doi)}
                    {text(fields.webLink)}
                    {text(fields.wosNumber)}
                    {text(fields.issn)}
                    {text(fields.eissn)}
                    {text(fields.eidScopus)}
                    <FilterCheckboxes
                        label={fm({ id: fields.mediaType.label })}
                        name={fields.mediaType.name}
                        codebook={fields.mediaType.codebook}
                        onChange={setFilter(fields.mediaType.name)}
                        isFilter={true}
                    />
                    <FilterCheckboxes
                        label={fm({ id: fields.eliPublication.label })}
                        name={fields.eliPublication.name}
                        options={PUBLICATION_ELI_FLAGS}
                        onChange={setFilter(fields.eliPublication.name)}
                        isFilter={true}
                    />
                    <FilterCheckboxes
                        label={fm({ id: fields.openAccessType.label })}
                        name={fields.openAccessType.name}
                        codebook={fields.openAccessType.codebook}
                        onChange={setFilter(fields.openAccessType.name)}
                        isFilter={true}
                    />
                </>,
            )}

            {section(
                filters.sections.journal,
                <>
                    {text(fields.longJournalTitle)}
                    {text(fields.shortJournalTitle)}
                    {text(fields.pages)}
                    <RangeInput
                        {...fields.volume}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.volume.name)(value)}
                    />
                    <RangeInput
                        {...fields.issue}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.issue.name)(value)}
                    />
                    <RangeInput
                        {...fields.pagesCount}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.pagesCount.name)(value)}
                    />
                </>,
            )}

            {section(
                filters.sections.authors,
                <>
                    {text(fields.allAuthors)}
                    {text(fields.eliAuthors)}
                    <RangeInput
                        {...fields.allAuthorsCount}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.allAuthorsCount.name)(value)}
                    />
                    <RangeInput
                        {...fields.eliAuthorsCount}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.eliAuthorsCount.name)(value)}
                    />
                    <Combobox
                        {...fields.eliResearchers}
                        codebookResponse={researcherOptions}
                        onSelect={setFilter(fields.eliResearchers.name)}
                        isFilter={true}
                    />
                    <Combobox
                        {...fields.department}
                        onSelect={setFilter(fields.department.name)}
                        isFilter={true}
                    />
                </>,
            )}

            {section(
                filters.sections.metrics,
                <>
                    <RangeInput
                        {...fields.impactFactor}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.impactFactor.name)(value)}
                    />
                    <FilterCheckboxes
                        label={fm({ id: fields.yearOfPublication.label })}
                        name={fields.yearOfPublication.name}
                        options={publicationFilterYears()}
                        onChange={setFilter(fields.yearOfPublication.name)}
                        isFilter={true}
                    />
                    <FilterCheckboxes
                        label={fm({ id: fields.quartil.label })}
                        name={fields.quartil.name}
                        options={PUBLICATION_QUARTILES}
                        onChange={setFilter(fields.quartil.name)}
                        isFilter={true}
                    />
                    {text(fields.quartilBasis)}
                    <RangeInput
                        {...fields.dateOfPublication}
                        placeholder={dateRange}
                        isFilter={true}
                        onChange={value => setFilter(fields.dateOfPublication.name)(value)}
                    />
                    {text(fields.oecdFord)}
                    <Combobox
                        {...fields.language}
                        onSelect={setFilter(fields.language.name)}
                        isFilter={true}
                    />
                    <Combobox
                        {...fields.experimentalSystem}
                        onSelect={setFilter(fields.experimentalSystem.name)}
                        isFilter={true}
                    />
                    <Combobox
                        {...fields.userCall}
                        onSelect={setFilter(fields.userCall.name)}
                        isFilter={true}
                    />
                    <Combobox
                        {...fields.userExperiment}
                        onSelect={setFilter(fields.userExperiment.name)}
                        isFilter={true}
                    />
                    <Combobox
                        {...fields.publishingCountry}
                        onSelect={setFilter(fields.publishingCountry.name)}
                        isFilter={true}
                    />
                </>,
            )}

            {section(
                filters.sections.conference,
                <>
                    <FilterCheckboxes
                        label={fm({ id: fields.publishFormat.label })}
                        name={fields.publishFormat.name}
                        codebook={fields.publishFormat.codebook}
                        onChange={setFilter(fields.publishFormat.name)}
                        isFilter={true}
                    />
                    <FilterCheckboxes
                        label={fm({ id: fields.conferenceScope.label })}
                        name={fields.conferenceScope.name}
                        codebook={fields.conferenceScope.codebook}
                        onChange={setFilter(fields.conferenceScope.name)}
                        isFilter={true}
                    />
                    {text(fields.publisher)}
                    {text(fields.publishPlace)}
                    {text(fields.isbn)}
                    {text(fields.bookTitle)}
                    {text(fields.editionVolume)}
                    {text(fields.proceedingsIsbn)}
                    {text(fields.conferencePlace)}
                    <RangeInput
                        {...fields.bookPagesCount}
                        placeholder={range}
                        isFilter={true}
                        onChange={value => setFilter(fields.bookPagesCount.name)(value)}
                    />
                    <RangeInput
                        {...fields.conferenceDate}
                        placeholder={dateRange}
                        isFilter={true}
                        onChange={value => setFilter(fields.conferenceDate.name)(value)}
                    />
                </>,
            )}

            {section(
                filters.sections.other,
                <>
                    {text(fields.abstract)}
                    {text(fields.keywords)}
                    {text(fields.citeAs)}
                    {text(fields.otherGrants)}
                    {text(fields.note)}
                    <Combobox
                        {...fields.grant}
                        codebookResponse={grantOptions}
                        onSelect={setFilter(fields.grant.name)}
                        isFilter={true}
                    />
                </>,
            )}
        </div>
    )
}
