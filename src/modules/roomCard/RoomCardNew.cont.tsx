import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { CODEBOOK } from '@/types/constants/codebook'
import type { RoomCard } from '@/types/gql/graphql'

import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SelectLocationTree } from './components/SelectLocation.combo'

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
    value: '5,5 bar'
  },
  {
    name: 'ROOM TEMPERATURE',
    value: 'temperature 18°C '
  },
  {
    name: 'HUMIDITY',
    value: 'humidity 35% +/- 5%'
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

  const columnsContactHall = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Contact - Hall',
        columns: [
          {
            accessorKey: 'role',
            meta: { noHeader: true },
            size: 200
          },
          {
            accessorKey: 'fullName',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'phone',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsContactDept = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Contact - Dept. 99',
        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'phone',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsTeam = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Team',
        accessorKey: 'teamName'
      }
    ],
    []
  )

  const columnsCleanRooms = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: "Clean Room's parameters",
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )
  const columnsPossibleParameters = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Possible Parameters',
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsClientRequirements = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Client Requirements',
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  return (
    <Form {...{ formMethods }}>
      <PageHead>
        <h1 className="text-2xl font-semibold">New room card</h1>
        <SelectLocationTree locationField={fields.location} />
      </PageHead>
      <Card>
        <div className="lg:flex justify-between">
          <PandaTable
            {...{
              tableId: 'roomCard-Contact',
              columns: columnsContactHall,
              data: contactPerson,
              className: 'border-l pb-0 sm:mb-4'
            }}
          />
          <PandaTable
            {...{
              tableId: 'roomCard-Contact-dept',
              columns: columnsContactDept,
              data: contactPerson,
              className: 'border-l pb-0 sm:mb-4'
            }}
          />
          <PandaTable
            {...{
              tableId: 'roomCard-team',
              columns: columnsTeam,
              data: team,
              className: 'border-l pb-0 sm:mb-4'
            }}
          />
        </div>
        <Heading customText="CLEAN ROOMS" className="mb-0" textColor="text-primary-500" />
        <PandaTable
          {...{
            tableId: 'roomCard-cleanRooms',
            columns: columnsCleanRooms,
            data: cleanRooms,
            className: 'border-l pb-0'
          }}
        />
        <Heading customText="BULDING MAINTENANCE - FM" className="mb-0" textColor="text-primary-500" />
        <PandaTable
          {...{
            tableId: 'roomCard-possibleParamsHeader',
            columns: columnsPossibleParameters,
            className: 'border-l pb-0',
            data: possibleParameters
          }}
        />

        <PandaTable
          {...{
            tableId: 'roomCard-clientRequirementsHead',
            columns: columnsClientRequirements,
            className: 'border-l pb-0',
            data: clientRequirements
          }}
        />
      </Card>
    </Form>
  )
}
