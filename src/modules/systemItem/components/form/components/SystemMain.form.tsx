import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useSystemItemStore } from '@/modules/systemItem/store/useSystemItemStore'
import { SystemLevel } from '@/types/gql/graphql'

import { EmployeeTable } from '../../table/Employee.table'
import useSystemFormFields from '../SystemForm.fields'
import { SystemCodeButton } from './SystemCodeGenerate.button'

interface SystemFormComponentProps {
  children?: React.ReactNode
}

export const SystemMainForm = ({ children }: SystemFormComponentProps) => {
  const fields = useSystemFormFields()
  const {
    setNewMaintainedBy,
    setDisconnectMaintainedBy,
    setNewOperator,
    setDisconnectOperator
  } = useSystemItemStore()
  const { control } = useFormContext()

  const systemLevel = useWatch({ control, name: 'systemLevel' })

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
          <Col
            sm={3}
            md={6}
            lg={8}
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 mb-auto"
          >
            <Col sm={3} md={6} lg={4}>
              <SystemTypeComboBox systemTypeField={fields.systemType} />
            </Col>
            <Col sm={3} md={6} lg={4}>
              <Listbox
                {...fields.systemLevel}
                customOptions={systemLevels}
                defaultValue={systemLevel || SystemLevel.SubsystemsAndParts}
              />
            </Col>
            <Col sm={3} md={6} lg={8}>
              <SelectLocationCombo
                locationField={fields.location}
                disabled={fields.location.disabled}
              />
            </Col>
            <Col sm={3} md={6} lg={8}>
              <Combobox {...fields.zone} />
            </Col>
            <Col sm={2} md={5} lg={6}>
              <Input {...fields.systemCode} defaultValue={''} />
            </Col>
            <Col sm={1} md={1} lg={2}>
              <SystemCodeButton />
            </Col>
            {systemLevel === SystemLevel.KeySystems && (
              <Col sm={3} md={6} lg={8}>
                <Listbox {...fields.attribute} />
              </Col>
            )}
          </Col>
        </Grid>
      </Card>
      <Card className="border-t border-gray-400">
        <Grid>
          <Col sm={3} md={6}>
            <Combobox {...fields.team} limit={50} />
          </Col>
          <Col sm={3} md={6}>
            <Combobox {...fields.responsible} />
          </Col>
          {systemLevel !== SystemLevel.SubsystemsAndParts && (
            <Fragment>
              <Col sm={3} md={6}>
                <EmployeeTable
                  name="operators"
                  className="w-full"
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
                  data={maintainedBy}
                  header={'Maintained By'}
                  setNewEmployee={setNewMaintainedBy}
                  setDisconnectEmployee={setDisconnectMaintainedBy}
                />
              </Col>
            </Fragment>
          )}
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
