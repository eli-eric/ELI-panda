import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import CheckBox from '@/components/form/CheckBox'
import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useSystemItemStore } from '@/modules/systemItem/store/useSystemItemStore'
import { SystemLevel } from '@/types/gql/graphql'

import { EmployeeTable } from '../../table/Employee.table'
import useSystemFormFields from '../SystemForm.fields'

interface SystemFormComponentProps {
  children?: React.ReactNode
}

export const SystemMainForm = ({ children }: SystemFormComponentProps) => {
  const fields = useSystemFormFields()
  const { setNewMaintainedBy, setDisconnectMaintainedBy, setNewOperator, setDisconnectOperator } = useSystemItemStore()
  const { control } = useFormContext()
  const maintainedBy = useWatch({ control, name: 'maintainedBy' })
  const operators = useWatch({ control, name: 'operators' })
  const systemLevels = Object.values(SystemLevel).map(level => level)

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
              <SystemTypeComboBox systemTypeField={fields.systemType} />
            </Col>
            <Col sm={3} md={6} lg={4}>
              <Listbox
                {...fields.systemLevel}
                customOptions={systemLevels}
                defaultValue={SystemLevel.SubsystemsAndParts}
              />
            </Col>
            <Col sm={3} md={6} lg={8}>
              <SelectLocationCombo locationField={fields.location} />
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
            <EmployeeTable
              name="operators"
              className="w-full"
              tableId="systemOperators"
              data={operators}
              header={'Authorized Operators'}
              setNewEmployee={setNewOperator}
              setDisconnectEmployee={setDisconnectOperator}
            />
          </Col>
          <Col sm={3} md={6}>
            <EmployeeTable
              name="maintainedBy"
              className="w-full"
              tableId="systemMainteners"
              data={maintainedBy}
              header={'Maintained By'}
              setNewEmployee={setNewMaintainedBy}
              setDisconnectEmployee={setDisconnectMaintainedBy}
            />
          </Col>
        </Grid>
      </Card>

      <Card className="border-t border-gray-400">
        <Grid>
          <Col sm={3} md={5} lg={2}>
            <Input type="number" {...fields.minimalSpareParstCount} />
          </Col>
          <Col sm={3} md={4} lg={1} className="">
            <CheckBox {...fields.isCritical} className="items-end pb-2" />
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
