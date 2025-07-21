import { useRouter } from 'next/router'

import Combobox from '@/components/form/Combobox'
import DateInput from '@/components/form/DatePicker'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import {
  Card as CardUI,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/card'

import useOrderFormFields from './OrderForm.fields'

const OrderFormComponent = () => {
  const fields = useOrderFormFields()
  const uid = useRouter().query.uid as string

  return (
    <CardUI className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-8 mt-4">
      <CardTitle>{uid ? 'EDIT ORDER' : 'NEW ORDER'}</CardTitle>
      <CardDescription>
        {uid
          ? 'Edit the order details below.'
          : 'Fill in the order details below.'}
      </CardDescription>
      <CardContent>
        <Grid>
          <Col lg={6}>
            <DateInput {...fields.orderDate} />
          </Col>
          <Col lg={6}>
            <Input {...fields.name} className="w-full" />
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
            <Input {...fields.requestNumber} className="w-full" />
          </Col>
          <Col>
            <Input {...fields.orderNumber} className="w-full" />
          </Col>
          <Col>
            <Input {...fields.contractNumber} className="w-full" />
          </Col>
          <Col sm="full">
            <TextArea {...fields.notes} />
          </Col>
        </Grid>
      </CardContent>
    </CardUI>
  )
}

export default OrderFormComponent
