import { useFormContext, useWatch } from 'react-hook-form'

import Listbox from '@/components/form/Listbox'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { getPublicationYearOptions } from '../utils/publication-year'

export const PublicationYearField = () => {
    const { control } = useFormContext()
    const year = useWatch({ control, name: 'yearOfPublication' })
    const { yearOfPublication } = usePublicationFields()
    return <Listbox {...yearOfPublication} customOptions={getPublicationYearOptions(year)} />
}
