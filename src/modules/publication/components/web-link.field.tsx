import { useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Input } from '@/components/form/inputs'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { getDerivedWebLink } from '../utils/doi'

export const WebLinkField = () => {
    const { webLink } = usePublicationFields()
    const { control, setValue } = useFormContext()
    const doi = useWatch({ control, name: 'doi' })
    const currentWebLink = useWatch({ control, name: 'webLink' })
    const previousDoi = useRef(doi)

    // Only blank or DOI-derived links follow DOI edits; imported record URLs survive.
    useEffect(() => {
        const next = getDerivedWebLink(doi, currentWebLink, previousDoi.current)
        previousDoi.current = doi
        if (next !== undefined) setValue('webLink', next)
    }, [doi, currentWebLink, setValue])

    return <Input {...webLink} />
}
