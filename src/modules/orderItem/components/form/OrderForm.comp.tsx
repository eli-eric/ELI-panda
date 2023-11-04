import { useRouter } from 'next/router'

import Combobox from '@/components/form/Combobox'
import DateInput from '@/components/form/DatePicker'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'

import useOrderFormFields from './OrderForm.fields'

const OrderFormComponent = () => {
  const fields = useOrderFormFields()
  const uid = useRouter().query.uid as string

  return (
    <Card className="py-6">
      <Grid>
        <Col lg={6}>
          <h1 className="text-2xl justify-center font-semibold text-gray-900">{uid ? 'EDIT ORDER' : 'NEW ORDER'}</h1>
        </Col>
        <Col lg={6}>
          <DateInput {...fields.orderDate} />
        </Col>
        <Col lg={6}>
          <Input {...fields.name} />
        </Col>
        <Col lg={6}>
          <Combobox {...fields.supplier} showAddButton={true} />
        </Col>
        <Col lg={6}>
          <Listbox {...fields.procurementResponsible} />
        </Col>
        <Col lg={6}>
          <Combobox {...fields.requestor} />
        </Col>
        <Col>
          <Listbox {...fields.orderStatus} />
        </Col>
        <Col>
          <Input {...fields.requestNumber} />
        </Col>
        <Col>
          <Input {...fields.orderNumber} />
        </Col>
        <Col>
          <Input {...fields.contractNumber} />
        </Col>
        <Col sm="full">
          <TextArea {...fields.notes} />
        </Col>
      </Grid>
    </Card>
  )
}

export default OrderFormComponent
