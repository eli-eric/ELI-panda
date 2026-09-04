import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Input } from '@/components/form/inputs'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { normalizeDoi } from '../utils/doi'

export const WebLinkField = () => {
    const { webLink } = usePublicationFields()
    const { control, setValue } = useFormContext()
    const doi = useWatch({ control, name: 'doi' })
    const currentWebLink = useWatch({ control, name: 'webLink' })

    // The field is read-only, so a canonical doi.org link is the only way it gets
    // filled by hand. Never clobber a value already there — an applied Web of
    // Science record link has to survive.
    useEffect(() => {
        if (!doi || currentWebLink) return

        const normalized = normalizeDoi(String(doi))
        if (normalized) setValue('webLink', `https://doi.org/${normalized}`)
    }, [doi, currentWebLink, setValue])

    return <Input {...webLink} />
}
