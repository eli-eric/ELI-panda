import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { CODEBOOK } from '@/types/constants/codebook'
import type { RoomCard } from '@/types/gql/graphql'

import { SelectLocationTree } from './components/SelectLocation.combo'
import { RoomCardTables } from './components/table/RoomCard.tables'

const cleanRooms = [
  {
    name: 'PURITY CLASS '
  },
  {
    name: 'PRESCRIBED CLOTHING'
  },
  {
    name: 'ENTRY TO HVAC TENT'
  },
  {
    name: 'CLEANING SCHEDULE'
  },
  {
    name: 'ADDITIONAL REQUIREMENTS'
  }
]

const possibleParameters = [
  {
    name: 'COOLING WATER'
  },
  {
    name: 'INDOOR ENVIRONMENT QUALITY'
  },
  {
    name: 'COMPRESSED AIR DISTRIBUTION'
  },
  {
    name: 'NITROGEN CENTRAL DISTRIBUTION'
  },
  {
    name: 'MAX. PRESSURE IN COLD DISTRIBUTION'
  }
]

const clientRequirements = [
  {
    name: 'PRESSURE IN COOLING SYSTEM'
  },
  {
    name: 'ROOM TEMPERATURE'
  },
  {
    name: 'HUMIDITY'
  }
]
export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCard>()

  const fields = useMakeFormFields({
    location: {
      name: 'location',
      disabled: false,
      codebook: CODEBOOK.LOCATION
    },
    contactPerson: {
      name: 'contactPerson',
      disabled: false
    }
  })

  return (
    <Form {...{ formMethods }}>
      <PageHead>
        <h1 className="text-2xl font-semibold">New room card</h1>
        <SelectLocationTree locationField={fields.location} />
      </PageHead>
      <RoomCardTables
        {...{
          cleanRooms,
          clientRequirements,
          possibleParameters
        }}
      />
    </Form>
  )
}
