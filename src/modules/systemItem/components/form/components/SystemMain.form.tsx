import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { SystemLevel } from '@/types/gql/graphql'

import {
  useAddSystemEmployee,
  useRemoveSystemEmployee,
  useSystemEmployees
} from '../../../hooks/employees'
import { EmployeeTable } from '../../table/Employee.table'
import useSystemFormFields from '../SystemForm.fields'
import { SystemCodeButton } from './SystemCodeGenerate.button'

interface SystemFormComponentProps {
  systemUid?: string
  children?: React.ReactNode
}

export const SystemMainForm = ({
  systemUid,
  children
}: SystemFormComponentProps) => {
  const fields = useSystemFormFields()
  const { control } = useFormContext()

  const systemLevel = useWatch({ control, name: 'systemLevel' })
  const systemLevels = Object.values(SystemLevel).map(level => level)

  // Fetch employees data separately (only in edit mode)
  const { operators, maintainedBy, refetch, isLoading } =
    useSystemEmployees(systemUid)

  // Mutation hooks for operators
  const { addEmployee: addOperator } = useAddSystemEmployee(
    systemUid,
    'operators',
    { onSuccess: refetch }
  )
  const { removeEmployee: removeOperator } = useRemoveSystemEmployee(
    systemUid,
    'operators',
    { onSuccess: refetch }
  )

  // Mutation hooks for maintainedBy
  const { addEmployee: addMaintainedBy } = useAddSystemEmployee(
    systemUid,
    'maintainedBy',
    { onSuccess: refetch }
  )
  const { removeEmployee: removeMaintainedBy } = useRemoveSystemEmployee(
    systemUid,
    'maintainedBy',
    { onSuccess: refetch }
  )

  // Show employee tables only in edit mode (when systemUid exists)
  // and when system level is not SubsystemsAndParts
  const showEmployeeTables =
    systemUid && systemLevel !== SystemLevel.SubsystemsAndParts

  return (
    <div className="space-y-6">
      {/* Basic System Information */}
      <Grid>
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

      {/* Team and Responsibility */}
      <Grid>
        <Col sm={3} md={6}>
          <Combobox {...fields.team} limit={50} />
        </Col>
        <Col sm={3} md={6}>
          <Combobox {...fields.responsible} />
        </Col>
        {showEmployeeTables && (
          <Fragment>
            <Col sm={3} md={6}>
              <EmployeeTable
                className="w-full"
                data={operators}
                header={'Authorized Operators'}
                onAdd={async emp => addOperator(emp.uid)}
                onRemove={removeOperator}
                isLoading={isLoading}
              />
            </Col>
            <Col sm={3} md={6}>
              <EmployeeTable
                className="w-full"
                data={maintainedBy}
                header={'Maintained By'}
                onAdd={async emp => addMaintainedBy(emp.uid)}
                onRemove={removeMaintainedBy}
                isLoading={isLoading}
              />
            </Col>
          </Fragment>
        )}
      </Grid>

      {/* Description */}
      <Grid>
        <Col sm="full">
          <TextArea {...fields.description} />
        </Col>
      </Grid>
    </div>
  )
}
