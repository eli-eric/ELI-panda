import { Fragment } from 'react'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { SelectLocationTree } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemLevel } from '@/types/gql/graphql'

import { MaintenedByTable } from '../../table/MaintenedBy.table'
import { OperatorsTable } from '../../table/Operators.table'
import useSystemFormFields from '../SystemForm.fields'

interface SystemFormComponentProps {
  children?: React.ReactNode
}

export const SystemMainForm = ({ children }: SystemFormComponentProps) => {
  const fields = useSystemFormFields()

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
            <OperatorsTable />
          </Col>
          <Col sm={3} md={6}>
            <MaintenedByTable />
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
