import Combobox from '@/components/form/Combobox'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { CODEBOOK } from '@/types/constants/codebook'

import { usePublicationFields } from '../hooks/usePublicationFields'

// TODO: this should be filtered on api, decide where to store this business logic
const allowedCountries = [
  'AU',
  'CN',
  'CZ',
  'DE',
  'DK',
  'FR',
  'GB',
  'HU',
  'CH',
  'JP',
  'NL',
  'PL',
  'RO',
  'TW',
  'US',
  'IT',
  'RS'
]

export function PublishingCountryListbox() {
  const { publishingCountry } = usePublicationFields()
  const { data } = useCodebook(CODEBOOK.COUNTRY)
  const filteredData = data?.data.filter(country =>
    allowedCountries.includes(country.code ?? '')
  )
  return <Combobox {...publishingCountry} />
}
