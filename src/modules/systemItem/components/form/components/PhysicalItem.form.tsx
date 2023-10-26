import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'

import useSystemFormFields from '../SystemForm.fields'

export const PhysicalItemForm = () => {
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
      <Col sm="full" className="flex-col">
        <p>Description:</p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vivamus ac leo pretium faucibus. Nulla quis diam.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam erat volutpat. Phasellus faucibus molestie
          nisl. Aliquam ornare wisi eu metus. Fusce suscipit libero eget elit. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos hymenaeos. Temporibus autem quibusdam et aut officiis debitis aut
          rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Nam quis
          nulla. Praesent dapibus. Etiam quis quam. Fusce aliquam vestibulum ipsum. Curabitur sagittis hendrerit ante.
          Vivamus porttitor turpis ac leo. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minim veniam, quis nostrud
        </p>
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
      <Col sm="full">
        <TextArea {...fields.itemNotes} />
      </Col>

      <Col sm={3} md={4}>
        <Input {...fields.serialNumber} />
      </Col>
    </Grid>
  )
}
