import { useRouter } from 'next/router'

import Combobox from '@/components/form/Combobox'
import DateInput from '@/components/form/DatePicker'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import useOrderDetail from '../../hooks/useOrderDetail'
import useOrderFormFields from './OrderForm.fields'

const orderFormMessages = message.ordersPage.orderDetail.form

const OrderFormComponent = () => {
  const fields = useOrderFormFields()
  const uid = useRouter().query.uid as string
  const { disabledEdit } = useOrderDetail()

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
          <Combobox
            name="supplier"
            label={orderFormMessages.supplier.label}
            codebook={CODEBOOK.SUPPLIER}
            limit={50}
            showAddButton={true}
            disabled={disabledEdit}
          />
        </Col>
        <Col lg={6}>
          <Listbox
            name="procurementResponsible"
            label={orderFormMessages.procurementResponsible.label}
            codebook={CODEBOOK.EMPLOYEE}
            allowEmptyOption={true}
            disabled={disabledEdit}
          />
        </Col>
        <Col lg={6}>
          <Combobox
            name="requestor"
            label={orderFormMessages.requestor.label}
            codebook={CODEBOOK.EMPLOYEE}
            limit={50}
            disabled={disabledEdit}
          />
        </Col>
        <Col>
          <Listbox
            name="orderStatus"
            label={orderFormMessages.orderStatus.label}
            codebook={CODEBOOK.ORDER_STATUS}
            disabled={disabledEdit}
          />
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
