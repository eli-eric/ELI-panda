import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'

import useSystemFormFields from './SystemForm.fields'

interface SystemFormComponentProps {
  children?: React.ReactNode
}

export const PhysicalItemForm = ({ children }: SystemFormComponentProps) => {
  const fields = useSystemFormFields()

  return (
    <Grid>
      <Col sm={3} md={4}>
        <Input {...fields.partNumber} />
      </Col>
      <Col sm={3} md={4}>
        <Combobox {...fields.catalogueSupplier} />
      </Col>
      <Col sm={3} md={4}>
        <Input {...fields.eun} />
      </Col>
      <Col sm="full">
        <TextArea {...fields.catalogueDescription} />
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.itemUsage} />
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.procurementStatus} />
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.itemConditionStatus} />
      </Col>
      <Col sm={3} md={4}>
        <Input {...fields.serialNumber} />
      </Col>
    </Grid>
  )
}
