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
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import useOrderFormFields from './OrderForm.fields'

const OrderFormComponent = () => {
  const fields = useOrderFormFields()
  const uid = useRouter().query.uid as string

  return (
    <CardUI className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-8 mt-4">
      <CardHeader>
        <CardTitle>{uid ? 'Edit Order' : 'New Order'}</CardTitle>
        <CardDescription>
          {uid
            ? 'Edit the order details below.'
            : 'Fill in the order details below.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Basic Information */}
        <Grid>
          <Col lg={8}>
            <Input {...fields.name} className="w-full" />
          </Col>
          <Col lg={4}>
            <DateInput {...fields.orderDate} className="w-full" />
          </Col>
          <Col lg={6}>
            <Combobox
              {...fields.supplier}
              showAddButton={true}
              className="w-full"
            />
          </Col>
          <Col lg={6}>
            <Listbox {...fields.procurementResponsible} className="w-full" />
          </Col>
          <Col lg={6}>
            <Combobox {...fields.requestor} className="w-full" />
          </Col>
          <Col lg={6}>
            <Listbox {...fields.orderStatus} className="w-full" />
          </Col>
        </Grid>

        <Separator />

        {/* Order Details */}
        <Grid>
          <Col lg={4}>
            <Input {...fields.requestNumber} className="w-full" />
          </Col>
          <Col lg={4}>
            <Input {...fields.orderNumber} className="w-full" />
          </Col>
          <Col lg={4}>
            <Input {...fields.contractNumber} className="w-full" />
          </Col>
        </Grid>

        <Separator />

        {/* Additional Information */}
        <Grid>
          <Col lg={12}>
            <TextArea {...fields.notes} className="w-full" />
          </Col>
        </Grid>
      </CardContent>
    </CardUI>
  )
}

export default OrderFormComponent
