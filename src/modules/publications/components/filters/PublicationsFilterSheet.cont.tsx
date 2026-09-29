import { useMemo } from 'react'

import { Form } from '@/components/form/Form'
import { useFormFilter } from '@/hooks/form/useFormFilters'
import { usePublicationsFilterOptions } from '@/modules/publications/hooks/usePublicationsFilterOptions'

import { PublicationsFilterForm } from './form/PublicationsFilter.form'
import { PublicationsFilterFooter } from './PublicationsFilterFooter.comp'
import type { PublicationFilterType } from './types/filter'

interface PublicationsFilterSheetProps {
    tableId: string
    enableQueryURL: boolean
}

export const PublicationsFilterSheet = ({
    tableId,
    enableQueryURL,
}: PublicationsFilterSheetProps) => {
    const { filterOptions } = usePublicationsFilterOptions()

    const defaultValues = useMemo<PublicationFilterType>(
        () => ({
            title: '',
            code: '',
            doi: '',
            allAuthors: '',
            eliAuthors: '',
            keywords: '',
            longJournalTitle: '',
            shortJournalTitle: '',
            abstract: '',
            citeAs: '',
            wosNumber: '',
            issn: '',
            eissn: '',
            eidScopus: '',
            oecdFord: '',
            note: '',
            otherGrants: '',
            webLink: '',
            publisher: '',
            publishPlace: '',
            isbn: '',
            bookTitle: '',
            editionVolume: '',
            proceedingsIsbn: '',
            conferencePlace: '',
            pages: '',
            yearOfPublication: [],
            quartil: [],
            quartilBasis: [],
            language: [],
            eliPublication: [],
            mediaTypeCb: [],
            openAccessType: [],
            publishFormatCb: [],
            conferenceScopeCb: [],
            experimentalSystemCb: null,
            userExperimentCb: null,
            userCall: null,
            publishingCountry: null,
            department: null,
            grants: null,
            eliResearchers: null,
        }),
        [],
    )

    const formMethods = useFormFilter<PublicationFilterType>({
        tableId,
        defValues: defaultValues,
        enableQueryURL: enableQueryURL,
    })

    return (
        <Form className="flex flex-col h-full justify-between" formMethods={formMethods}>
            <PublicationsFilterForm
                tableId={tableId}
                enableQueryUrl={enableQueryURL}
                filterOptions={filterOptions}
            />
            <PublicationsFilterFooter
                tableId={tableId}
                enableQueryURL={enableQueryURL}
                resetForm={formMethods.reset}
                defaultFormValues={defaultValues}
            />
        </Form>
    )
}
