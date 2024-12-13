import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Input } from '@/components/form/inputs'

import { usePublicationFields } from '../hooks/usePublicationFields'

export const WebLinkField = () => {
  const { webLink } = usePublicationFields()
  const { control, setValue } = useFormContext()
  const doi = useWatch({ control, name: 'doi' })

  useEffect(() => {
    if (doi) {
      setValue('webLink', `https://doi.org/${doi}`)
    } else {
      setValue('webLink', '')
    }
  }, [doi, setValue])

  return <Input {...webLink} />
}
