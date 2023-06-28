import Combobox from '@/components/form/Combobox'
import { Input, InputAmount, InputCurrency, TextArea } from '@/components/form/Input'
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
      <Col sm={3} md={2} lg={4} className="md:pr-4">
        {children}
      </Col>
      <Col sm={3} md={4} lg={8} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 mb-auto">
        <Col sm={3} md={4} lg={8}>
          <Input {...fields.catalogueName} />
        </Col>
        <Col sm={3} md={4}>
          <Combobox {...fields.catalogueCategory} useFirstRender={false} />
        </Col>
        <Col sm={3} md={4}>
          <Combobox {...fields.catalogueSupplier} useFirstRender={false} />
        </Col>
        <Col sm={3} md={4}>
          <Input {...fields.partNumber} />
        </Col>
        <Col sm={3} md={4}>
          <Input {...fields.serialNumber} />
        </Col>
      </Col>
      <Col sm={3} md={4}>
        <Input {...fields.eun} />
      </Col>
      <Col sm={3} md={4}>
        <InputAmount {...fields.price}>
          <InputCurrency {...fields.currency} />
        </InputAmount>
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.itemUsage} useFirstRender={false} />
      </Col>

      <Col sm="full">
        <TextArea {...fields.catalogueDescription} />
      </Col>
    </Grid>
  )
}
