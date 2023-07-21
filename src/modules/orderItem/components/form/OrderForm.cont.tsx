import { yupResolver } from '@hookform/resolvers/yup'
import { forwardRef, useImperativeHandle } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import uuid from 'react-uuid'

import { Form } from '@/components/form/Form'
import { convertDate } from '@/helpers/formatters'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'

import useOrderDetail from '../../hooks/useOrderDetail'
import type { OrderDetailFormType, OrderLineFormType } from '../../types'
import HeaderComponent from '../Header.comp'
import OrderFormComponent from './OrderForm.comp'
import { schema } from './OrderForm.schema'

const messages = message.ordersPage

export type OrderFormContainerRef = {
  setOrderLine: (orderLine: OrderLineFormType) => void
  deleteOrderLine: (orderLine: OrderLineFormType) => void
  orderLines: OrderLineFormType[]
}

export const OrderFormContainer = forwardRef<OrderFormContainerRef | undefined, any>((_p, ref) => {
  const { orderDetail, submit, loading } = useOrderDetail()
  const { formatMessage: fm } = useIntl()

  // initialize the form
  const formMethods = useForm<OrderDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...orderDetail,
      orderLines:
        orderDetail?.orderLines &&
        orderDetail?.orderLines.map(orderLine => ({ ...orderLine, id: orderLine.uid || uuid() })),
      orderDate: orderDetail?.orderDate,
      orderStatus: orderDetail?.orderStatus || { uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54', name: 'Requested' }
    }
  })

  const withWarningModal = useWarningModal(fm({ id: messages.ordelineMissingModal.message }))
  //submit the form
  const onSubmit = (data: OrderDetailFormType) => {
    if (data.orderLines.length === 0 || !data.orderLines) {
      withWarningModal(submit)({ ...data, orderDate: convertDate(data.orderDate) })
    } else {
      submit({ ...data, orderDate: convertDate(data.orderDate) })
    }
  }
  const { insert, update, fields, remove } = useFieldArray({ control: formMethods.control, name: 'orderLines' })

  //  set the order lines to the form
  const setOrderLine = (orderLine: OrderLineFormType) => {
    const dataToSave = { ...orderLine }
    if (orderLine.id) {
      const index = fields.findIndex(item => item.id === orderLine.id)
      update(index, dataToSave)
    } else {
      dataToSave.id = uuid()
      insert(fields.length, dataToSave)
    }
  }
  //  delete the order line from the form
  const deleteOrderLine = (orderLine: OrderLineFormType) => {
    const index = fields.findIndex(item => item.id === orderLine.id)
    remove(index)
  }

  useImperativeHandle(ref, () => ({
    setOrderLine,
    deleteOrderLine,
    orderLines: fields
  }))

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} enableLeaveWarning={true}>
      <HeaderComponent loading={loading} />
      <div className="py-6">
        <OrderFormComponent />
      </div>
    </Form>
  )
})

OrderFormContainer.displayName = 'OrderFormContainer'
