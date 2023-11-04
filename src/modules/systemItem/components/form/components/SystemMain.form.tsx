import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { CellWithDelete } from '@/modules/roomCard/components/table/CellWithDelete'
import { ContactDeptButton } from '@/modules/roomCard/components/table/ContactDeptButton'
import { SelectLocationTree } from '@/modules/shared/form/SelectLocation.combo'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemLevel } from '@/types/gql/graphql'

import useSystemFormFields from '../SystemForm.fields'

interface SystemFormComponentProps {
  children?: React.ReactNode
}

export const SystemMainForm = ({ children }: SystemFormComponentProps) => {
  const fields = useSystemFormFields()

  const systemLevels = Object.values(SystemLevel).map(level => level)
  const columnsMaintener = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Maintened by',
        meta: { headerElement: <ContactDeptButton /> },
        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => <CellWithDelete {...props} formName="contactPersonsDept" setDeleteItem={() => {}} />,
            size: 563
          }
        ]
      }
    ],
    []
  )
  const columnsOperators = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Authorized Operators',
        meta: { headerElement: <ContactDeptButton /> },

        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => <CellWithDelete {...props} formName="contactPersonsDept" setDeleteItem={() => {}} />,
            size: 563
          }
        ]
      }
    ],
    []
  )

  return (
    <Fragment>
      <Card className="">
        <Grid className="pt-4">
          <Col sm={3} md={6} lg={12}>
            <Input {...fields.name} className={'font-bold'} />
          </Col>
          <Col sm={3} md={6} lg={4} className="md:pr-4">
            {children}
          </Col>
          <Col sm={3} md={6} lg={8} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 mb-auto">
            <Col sm={3} md={6} lg={4}>
              <Listbox {...fields.systemType} />
            </Col>
            <Col sm={3} md={6} lg={4}>
              <Listbox {...fields.systemLevel} customOptions={systemLevels} />
            </Col>
            <Col sm={3} md={6} lg={8}>
              <SelectLocationTree locationField={fields.location} />
            </Col>
            <Col sm={3} md={6} lg={8}>
              <Combobox {...fields.zone} />
            </Col>
            <Col sm={3} md={6} lg={4}>
              <Input {...fields.systemCode} />
            </Col>
            <Col sm={3} md={6} lg={4}>
              <Input {...fields.systemAlias} />
            </Col>
          </Col>
        </Grid>
      </Card>
      <Card className="border-t border-gray-400">
        <Grid>
          <Col sm={3} md={6}>
            <Combobox {...fields.responsible} />
          </Col>
          <Col sm={3} md={6}>
            <Listbox {...fields.parentSystem} />
          </Col>
          <Col sm={3} md={6}>
            <PandaTable
              {...{
                tableId: 'systemOperators',
                columns: columnsOperators,
                data: [{ fullName: 'Jan Novák' }, { fullName: 'Petr Novák' }, { fullName: 'Pavel Novák' }],
                className: 'border-l border-gray-400 mb-0 pb-0  w-full'
              }}
            />
          </Col>
          <Col sm={3} md={6}>
            <PandaTable
              {...{
                tableId: 'systemMainteners',
                columns: columnsMaintener,
                data: [{ fullName: 'Jan Novák' }, { fullName: 'Petr Novák' }, { fullName: 'Pavel Novák' }],
                className: 'border-l border-gray-400 mb-0 pb-0  w-full'
              }}
            />
          </Col>
        </Grid>
      </Card>

      <Card className="border-t border-gray-400 ">
        <Grid>
          <Col sm="full">
            <TextArea {...fields.description} />
          </Col>
        </Grid>
      </Card>
    </Fragment>
  )
}
