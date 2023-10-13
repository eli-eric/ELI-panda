import { useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import type { RoomCard } from '@/types/gql/graphql'

import { SelectLocationTree } from './components/SelectLocation.combo'
import { RoomCardTables } from './components/table/RoomCard.tables'

const messages = message.roomCardsPage

const cleanRooms = [
  {
    name: 'PURITY CLASS',
    code: 'purityClass'
  },
  {
    name: 'PRESCRIBED CLOTHING',
    code: 'prescribedClothing'
  },
  {
    name: 'ENTRY TO HVAC TENT',
    code: 'entryToHvacTent'
  },
  {
    name: 'CLEANING SCHEDULE',
    code: 'cleaningSchedule'
  },
  {
    name: 'ADDITIONAL REQUIREMENTS',
    code: 'additionalRequirements'
  }
]

const possibleParameters = [
  {
    name: 'COOLING WATER',
    code: 'coolingWater'
  },
  {
    name: 'INDOOR ENVIRONMENT QUALITY',
    code: 'indoorEnvironmentQuality'
  },
  {
    name: 'COMPRESSED AIR DISTRIBUTION',
    code: 'compressedAirDistribution'
  },
  {
    name: 'NITROGEN CENTRAL DISTRIBUTION',
    code: 'nitrogenCentralDistribution'
  },
  {
    name: 'MAX. PRESSURE IN COLD DISTRIBUTION',
    code: 'maxPressureInColdDistribution'
  }
]

const clientRequirements = [
  {
    name: 'PRESSURE IN COOLING SYSTEM',
    code: 'pressureInCoolingSystem'
  },
  {
    name: 'ROOM TEMPERATURE',
    code: 'roomTemperature'
  },
  {
    name: 'HUMIDITY',
    code: 'humidity'
  }
]
export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCard>()

  const { handleSubmit } = formMethods

  const fields = useMakeFormFields({
    location: {
      name: 'location',
      disabled: false,
      label: messages.form.location.label,
      codebook: CODEBOOK.LOCATION
    },
    status: {
      name: 'status',
      label: messages.form.status.label,
      disabled: false
    }
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Form
      {...{
        formMethods,
        enableLeaveWarning: true
      }}
    >
      <PageHead>
        <h1 className="text-2xl font-semibold">New room card</h1>
        <Listbox {...fields.status} className="w-72" />
        <SelectLocationTree locationField={fields.location} />
        <div>
          <Button type="button" primary onClick={onSubmit}>
            Save
          </Button>
          <Button>Cancel</Button>
        </div>
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
