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
    code: 'purityClass',
    value: 'ISO 7'
  },
  {
    name: 'PRESCRIBED CLOTHING',
    code: 'prescribedClothing',
    value: 'Cap'
  },
  {
    name: 'ENTRY TO HVAC TENT',
    code: 'entryToHvacTent',
    value: ''
  },
  {
    name: 'CLEANING SCHEDULE',
    code: 'cleaningSchedule',
    value: '1x/week'
  },
  {
    name: 'ADDITIONAL REQUIREMENTS',
    code: 'additionalRequirements',
    value: 'Clean room is not in use'
  }
]

const possibleParameters = [
  {
    name: 'COOLING WATER',
    code: 'coolingWater',
    value: 'DEMI water - centrally 16°C'
  },
  {
    name: 'INDOOR ENVIRONMENT QUALITY',
    code: 'indoorEnvironmentQuality',
    value: 'temperature 20°C +/- 1°C; humidity 50% +/- 5%'
  },
  {
    name: 'COMPRESSED AIR DISTRIBUTION',
    code: 'compressedAirDistribution',
    value: '7bar - 8bar'
  },
  {
    name: 'NITROGEN CENTRAL DISTRIBUTION',
    code: 'nitrogenCentralDistribution',
    value: '1,9bar - 2,5bar depending on the outdoor temperature'
  },
  {
    name: 'MAX. PRESSURE IN COLD DISTRIBUTION',
    code: 'maxPressureInColdDistribution',
    value: '6bar'
  }
]
const clientRequirements = [
  {
    name: 'PRESSURE IN COOLING SYSTEM',
    code: 'pressureInCoolingSystem',
    value: '6bar'
  },
  {
    name: 'ROOM TEMPERATURE',
    code: 'roomTemperature',
    value: '20°C +/- 1°C'
  },
  {
    name: 'HUMIDITY',
    code: 'humidity',
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
