import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { FilterCheckboxes } from '@/components/form/FIlterCheckboxes'
import { Input } from '@/components/form/inputs'
import MultiCombobox from '@/components/form/MultiCombobox'
import { RangeInput } from '@/components/form/RangeInput'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { ELI_PUBLICATION } from '@/modules/publication/types/constants'
import type { CodebookType } from '@/types/responses/codebook'

import { DateRangeFilter } from '../DateRangeFilter.comp'
import {
    useGrantFilterOptions,
    useResearcherFilterOptions,
} from '../hooks/usePublicationsFilterSources'
import type { PublicationsFilterOptionsResponse } from '../types/filter'
import { usePublicationsFilterFields } from './PublicationsFilter.fields'

const { filters } = message.publication

const QUARTIL_FALLBACK = ['Q1', 'Q2', 'Q3', 'Q4']

interface Props {
    tableId: string
    enableQueryUrl: boolean
    filterOptions?: PublicationsFilterOptionsResponse
}

/** Plain string values as MultiCombobox options; the value doubles as the uid sent to the API. */
const toValueOptions = (values: string[]): CodebookType[] =>
    values.map(value => ({ uid: value, name: value }))

const SectionTitle = ({ title }: { title: string }) => (
    <div className="col-span-2 pt-2 first:pt-0">
        <h3 className="text-sm font-semibold border-b pb-1">{title}</h3>
    </div>
)

export const PublicationsFilterForm = ({ tableId, enableQueryUrl, filterOptions }: Props) => {
    const { formatMessage: fm } = useIntl()
    const fields = usePublicationsFilterFields()
    const { setFilter } = useFormFilterState({ tableId, enableQueryUrl })
    const { grantOptions } = useGrantFilterOptions()
    const { researcherOptions } = useResearcherFilterOptions()

    const yearOptions = toValueOptions(filterOptions?.years || [])
    const quartilOptions = toValueOptions(
        filterOptions?.quartils?.length ? filterOptions.quartils : QUARTIL_FALLBACK,
    )
    const quartilBasisOptions = toValueOptions(filterOptions?.quartilBases || [])
    const languageOptions = toValueOptions(filterOptions?.languages || [])
    const eliPublicationOptions = filterOptions?.eliPublications?.length
        ? filterOptions.eliPublications
        : Object.values(ELI_PUBLICATION)

    // Placeholders show the data bounds from filter-options when known.
    const rangePlaceholder = (id: string) => {
        const range = filterOptions?.ranges?.[id]
        return {
            min: range?.min != null ? String(range.min) : fm({ id: filters.rangeMin }),
            max: range?.max != null ? String(range.max) : fm({ id: filters.rangeMax }),
        }
    }

    return (
        <div className={cn('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
            <SectionTitle title={fm({ id: filters.sections.identification })} />
            <Input {...fields.title} onChange={setFilter(fields.title.name)} isFilter />
            <Input {...fields.code} onChange={setFilter(fields.code.name)} isFilter />
            <Input {...fields.doi} onChange={setFilter(fields.doi.name)} isFilter />
            <FilterCheckboxes
                name={fields.eliPublication.name}
                label={fields.eliPublication.label as string}
                options={eliPublicationOptions}
                onChange={setFilter(fields.eliPublication.name)}
                isFilter
            />
            <FilterCheckboxes
                name={fields.mediaTypeCb.name}
                label={fields.mediaTypeCb.label as string}
                codebook={fields.mediaTypeCb.codebook}
                onChange={setFilter(fields.mediaTypeCb.name)}
                isFilter
            />
            <FilterCheckboxes
                name={fields.openAccessType.name}
                label={fields.openAccessType.label as string}
                codebook={fields.openAccessType.codebook}
                onChange={setFilter(fields.openAccessType.name)}
                isFilter
            />
            <Input {...fields.webLink} onChange={setFilter(fields.webLink.name)} isFilter />

            <SectionTitle title={fm({ id: filters.sections.journal })} />
            <Input
                {...fields.longJournalTitle}
                onChange={setFilter(fields.longJournalTitle.name)}
                isFilter
            />
            <Input
                {...fields.shortJournalTitle}
                onChange={setFilter(fields.shortJournalTitle.name)}
                isFilter
            />
            <Input {...fields.issn} onChange={setFilter(fields.issn.name)} isFilter />
            <Input {...fields.eissn} onChange={setFilter(fields.eissn.name)} isFilter />
            <Input {...fields.citeAs} onChange={setFilter(fields.citeAs.name)} isFilter />
            <Input {...fields.pages} onChange={setFilter(fields.pages.name)} isFilter />
            <MultiCombobox
                {...fields.language}
                codebookResponse={languageOptions}
                onChange={setFilter(fields.language.name)}
            />
            <Combobox
                {...fields.publishingCountry}
                codebook={fields.publishingCountry.codebook}
                onSelect={setFilter(fields.publishingCountry.name)}
                isFilter
            />
            <Input {...fields.wosNumber} onChange={setFilter(fields.wosNumber.name)} isFilter />
            <Input {...fields.eidScopus} onChange={setFilter(fields.eidScopus.name)} isFilter />

            <SectionTitle title={fm({ id: filters.sections.authorsDepartments })} />
            <Input {...fields.allAuthors} onChange={setFilter(fields.allAuthors.name)} isFilter />
            <RangeInput
                {...fields.allAuthorsCount}
                placeholder={rangePlaceholder(fields.allAuthorsCount.name)}
                isFilter
                onChange={value => setFilter(fields.allAuthorsCount.name)(value)}
            />
            <Input {...fields.eliAuthors} onChange={setFilter(fields.eliAuthors.name)} isFilter />
            <RangeInput
                {...fields.eliAuthorsCount}
                placeholder={rangePlaceholder(fields.eliAuthorsCount.name)}
                isFilter
                onChange={value => setFilter(fields.eliAuthorsCount.name)(value)}
            />
            <Combobox
                {...fields.eliResearchers}
                codebookResponse={researcherOptions}
                hasClientFilter
                onSelect={setFilter(fields.eliResearchers.name)}
                isFilter
            />
            <Combobox
                {...fields.department}
                codebook={fields.department.codebook}
                onSelect={setFilter(fields.department.name)}
                isFilter
            />

            <SectionTitle title={fm({ id: filters.sections.metrics })} />
            <MultiCombobox
                {...fields.yearOfPublication}
                codebookResponse={yearOptions}
                onChange={setFilter(fields.yearOfPublication.name)}
            />
            <DateRangeFilter
                name={fields.dateOfPublication.name}
                label={fields.dateOfPublication.label}
                bounds={filterOptions?.dateBounds?.dateOfPublication}
                onChange={setFilter(fields.dateOfPublication.name)}
                isFilter
            />
            <RangeInput
                {...fields.impactFactor}
                placeholder={rangePlaceholder(fields.impactFactor.name)}
                isFilter
                onChange={value => setFilter(fields.impactFactor.name)(value)}
            />
            <MultiCombobox
                {...fields.quartil}
                codebookResponse={quartilOptions}
                onChange={setFilter(fields.quartil.name)}
            />
            <MultiCombobox
                {...fields.quartilBasis}
                codebookResponse={quartilBasisOptions}
                onChange={setFilter(fields.quartilBasis.name)}
            />
            <RangeInput
                {...fields.pagesCount}
                placeholder={rangePlaceholder(fields.pagesCount.name)}
                isFilter
                onChange={value => setFilter(fields.pagesCount.name)(value)}
            />
            <RangeInput
                {...fields.volume}
                placeholder={rangePlaceholder(fields.volume.name)}
                isFilter
                onChange={value => setFilter(fields.volume.name)(value)}
            />
            <RangeInput
                {...fields.issue}
                placeholder={rangePlaceholder(fields.issue.name)}
                isFilter
                onChange={value => setFilter(fields.issue.name)(value)}
            />

            <SectionTitle title={fm({ id: filters.sections.conferenceBook })} />
            <Input {...fields.isbn} onChange={setFilter(fields.isbn.name)} isFilter />
            <Input {...fields.bookTitle} onChange={setFilter(fields.bookTitle.name)} isFilter />
            <RangeInput
                {...fields.bookPagesCount}
                placeholder={rangePlaceholder(fields.bookPagesCount.name)}
                isFilter
                onChange={value => setFilter(fields.bookPagesCount.name)(value)}
            />
            <Input
                {...fields.editionVolume}
                onChange={setFilter(fields.editionVolume.name)}
                isFilter
            />
            <Input {...fields.publisher} onChange={setFilter(fields.publisher.name)} isFilter />
            <Input
                {...fields.publishPlace}
                onChange={setFilter(fields.publishPlace.name)}
                isFilter
            />
            <FilterCheckboxes
                name={fields.publishFormatCb.name}
                label={fields.publishFormatCb.label as string}
                codebook={fields.publishFormatCb.codebook}
                onChange={setFilter(fields.publishFormatCb.name)}
                isFilter
            />
            <Input
                {...fields.proceedingsIsbn}
                onChange={setFilter(fields.proceedingsIsbn.name)}
                isFilter
            />
            <DateRangeFilter
                name={fields.conferenceDate.name}
                label={fields.conferenceDate.label}
                bounds={filterOptions?.dateBounds?.conferenceDate}
                onChange={setFilter(fields.conferenceDate.name)}
                isFilter
            />
            <Input
                {...fields.conferencePlace}
                onChange={setFilter(fields.conferencePlace.name)}
                isFilter
            />
            <FilterCheckboxes
                name={fields.conferenceScopeCb.name}
                label={fields.conferenceScopeCb.label as string}
                codebook={fields.conferenceScopeCb.codebook}
                onChange={setFilter(fields.conferenceScopeCb.name)}
                isFilter
            />

            <SectionTitle title={fm({ id: filters.sections.other })} />
            <Input {...fields.abstract} onChange={setFilter(fields.abstract.name)} isFilter />
            <Input {...fields.keywords} onChange={setFilter(fields.keywords.name)} isFilter />
            <Input {...fields.oecdFord} onChange={setFilter(fields.oecdFord.name)} isFilter />
            <Combobox
                {...fields.grants}
                codebookResponse={grantOptions}
                hasClientFilter
                onSelect={setFilter(fields.grants.name)}
                isFilter
            />
            <Input
                {...fields.otherGrants}
                onChange={setFilter(fields.otherGrants.name)}
                isFilter
            />
            <Combobox
                {...fields.experimentalSystemCb}
                codebook={fields.experimentalSystemCb.codebook}
                onSelect={setFilter(fields.experimentalSystemCb.name)}
                isFilter
            />
            <Combobox
                {...fields.userExperimentCb}
                codebook={fields.userExperimentCb.codebook}
                onSelect={setFilter(fields.userExperimentCb.name)}
                isFilter
            />
            <Combobox
                {...fields.userCall}
                codebook={fields.userCall.codebook}
                onSelect={setFilter(fields.userCall.name)}
                isFilter
            />
            <Input {...fields.note} onChange={setFilter(fields.note.name)} isFilter />
        </div>
    )
}
