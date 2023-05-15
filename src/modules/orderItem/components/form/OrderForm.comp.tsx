import { useRouter } from 'next/router'

import ComboboxComponent from '@/components/form/Combobox'
import DateInput from '@/components/form/DatePicker'
import { Input, TextArea } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'
import Card from '@/components/layout/Card'
import { Col, Grid } from '@/components/layout/grid/Grid'

import useOrderFormFields from './OrderForm.fields'

interface Props {
  disabledEdit?: boolean
}

const OrderFormComponent = ({ disabledEdit }: Props) => {
  const fields = useOrderFormFields(disabledEdit)
  const uid = useRouter().query.uid as string

  return (
    <Card>
      <Grid>
        <Col lg={6}>
          <h1 className="text-2xl justify-center font-semibold text-gray-900">{uid ? 'EDIT ORDER' : 'NEW ORDER'}</h1>
        </Col>
        {/*<Input {...fields.orderDate} className="pb-1 col-span-3 lg:col-span-6 pl-1" />*/}
        <Col lg={6}>
          <DateInput {...fields.orderDate} />
        </Col>
        <Col lg={6}>
          <Input {...fields.name} />
        </Col>
        <Col lg={6}>
          <ComboboxComponent {...fields.supplier} isObject={true} limit={50} />
        </Col>
        <Col lg={6}>
          <ListBox {...fields.procurementResponsible} isObject={true} />
        </Col>
        <Col lg={6}>
          <ComboboxComponent {...fields.requestor} isObject={true} limit={50} />
        </Col>
        <Col>
          <ListBox {...fields.orderStatus} />
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
