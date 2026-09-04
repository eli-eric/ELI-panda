import { useMemo } from 'react'

import { Form } from '@/components/form/Form'
import { useFormFilter } from '@/hooks/form/useFormFilters'

import type { PublicationFilterType } from '../../types/filter'
import { PublicationsFilterForm } from './form/PublicationsFilter.form'
import { PublicationsFilterFooter } from './PublicationsFilterFooter.comp'

interface Props {
    tableId: string
    enableQueryURL: boolean
}

export const PublicationsFilterSheet = ({ tableId, enableQueryURL }: Props) => {
    const defaultValues = useMemo<PublicationFilterType>(
        () => ({
            title: '',
            code: '',
            doi: '',
            webLink: '',
            wosNumber: '',
            issn: '',
            eissn: '',
            eidScopus: '',
            mediaType: [],
            eliPublication: [],
            openAccessType: [],

            longJournalTitle: '',
            shortJournalTitle: '',
            volume: {},
            issue: {},
            pages: '',
            pagesCount: {},

            allAuthors: '',
            allAuthorsCount: {},
            eliAuthors: '',
            eliAuthorsCount: {},
            eliResearchers: null,
            department: null,

            impactFactor: {},
            quartil: [],
            quartilBasis: [],
            yearOfPublication: [],
            dateOfPublication: {},
            language: [],
            oecdFord: '',
            experimentalSystem: null,
            userCall: null,
            userExperiment: null,
            publishingCountry: null,

            publishFormat: [],
            conferenceScope: [],
            publisher: '',
            publishPlace: '',
            isbn: '',
            bookTitle: '',
            bookPagesCount: {},
            editionVolume: '',
            proceedingsIsbn: '',
            conferenceDate: {},
            conferencePlace: '',

            abstract: '',
            keywords: '',
            citeAs: '',
            grant: null,
            otherGrants: '',
            note: '',
        }),
        [],
    )

    const formMethods = useFormFilter<PublicationFilterType>({
        tableId,
        defValues: defaultValues,
        enableQueryURL,
    })

    return (
        <Form className="flex flex-col h-full justify-between gap-6" formMethods={formMethods}>
            <PublicationsFilterForm tableId={tableId} enableQueryUrl={enableQueryURL} />
            <PublicationsFilterFooter
                tableId={tableId}
                enableQueryURL={enableQueryURL}
                resetForm={formMethods.reset}
                defaultFormValues={defaultValues}
            />
        </Form>
    )
}
