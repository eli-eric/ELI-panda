import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { CODEBOOK } from '@/types/constants/codebook'
import type { RoomCard } from '@/types/gql/graphql'

import { RoomCardTables } from './components/table/RoomCard.tables'

const contactPerson = [
  {
    fullName: 'John Doe',
    phone: '123456789',
    role: 'Responsible'
  },
  {
    fullName: 'Jane Doe',
    phone: '987654321',
    role: 'Deputy for Technology'
  },
  {
    fullName: 'Jiří Doe',
    phone: '123456789',
    role: 'Engineer'
  }
]

const team = [
  {
    teamName: 'Building Maintenance'
  },
  {
    teamName: 'Clean Rooms'
  },
  {
    teamName: 'Facility Management'
  }
]

const cleanRooms = [
  {
    name: 'PURITY CLASS ',
    value: 'ISO 7'
  },
  {
    name: 'PRESCRIBED CLOTHING',
    value: 'Cap'
  },
  {
    name: 'ENTRY TO HVAC TENT',
    value: ''
  },
  {
    name: 'CLEANING SCHEDULE',
    value: '1x/week'
  },
  {
    name: 'ADDITIONAL REQUIREMENTS',
    value: 'Clean room is not in use'
  }
]

const possibleParameters = [
  {
    name: 'COOLING WATER',
    value: 'DEMI water - centrally 16°C'
  },
  {
    name: 'INDOOR ENVIRONMENT QUALITY',
    value: 'temperature 20°C +/- 1°C; humidity 50% +/- 5%'
  },
  {
    name: 'COMPRESSED AIR DISTRIBUTION',
    value: '7bar - 8bar'
  },
  {
    name: 'NITROGEN CENTRAL DISTRIBUTION',
    value: '1,9bar - 2,5bar depending on the outdoor temperature'
  },
  {
    name: 'MAX. PRESSURE IN COLD DISTRIBUTION',
    value: '6bar'
  }
]
const clientRequirements = [
  {
    name: 'PRESSURE IN COOLING SYSTEM',
    value: '6bar'
  },
  {
    name: 'ROOM TEMPERATURE',
    value: '20°C +/- 1°C'
  },
  {
    name: 'HUMIDITY',
    value: '50% +/- 5%'
  }
]

export const RoomCardDetailContainer = () => {
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
        <h1 className="text-2xl font-semibold">Location will be here</h1>
        {/* <SelectLocationTree locationField={fields.location} /> */}
      </PageHead>
      <RoomCardTables
        {...{
          cleanRooms,
          clientRequirements,
          possibleParameters,
          contactPersonHall: contactPerson,
          contactPersonDept: contactPerson,
          team
        }}
      />
    </Form>
  )
}
