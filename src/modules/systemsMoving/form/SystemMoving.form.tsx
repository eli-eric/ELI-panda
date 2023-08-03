import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'

import { useSystemMovingFormFields } from './SystemMoving.fields'

export const SystemMovingForm = () => {
  const fields = useSystemMovingFormFields()

  return (
    <Grid>
      <Col sm={3} md={4} lg={8}>
        <Input {...fields.name} />
      </Col>
      <Col sm={3} md={4}>
        <Combobox {...fields.owner} useFirstRender={false} />
      </Col>
      <Col sm={3} md={4}>
        <Combobox {...fields.responsible} useFirstRender={false} />
      </Col>

      <Col sm={3} md={4} lg={8}>
        <Listbox {...fields.importance} useFirstRender={false} />
      </Col>
      <Col sm={3} md={6}>
        <Combobox {...fields.location} useFirstRender={false} />
      </Col>
      <Col sm={3} md={6}>
        <Listbox {...fields.zone} useFirstRender={false} />
      </Col>
      <Col sm={3} md={6}>
        <Listbox {...fields.systemType} useFirstRender={false} />
      </Col>
      <Col sm={3}>
        {/* @TODO: system code should be disabled? */}
        <Input {...fields.systemCode} />
      </Col>
      <Col sm={3}>
        <Input {...fields.systemAlias} />
      </Col>
      <Col sm="full">
        <TextArea {...fields.description} />
      </Col>
    </Grid>
  )
}
