import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import uuid from 'react-uuid'

import { convertDate } from '@/helpers/formatters'
import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'

import useOrderDetail from '../../hooks/useOrderDetail'
import type { OrderDetailFormType, OrderLineFormType } from '../../types'
import HeaderComponent from '../Header.comp'
import OrderFormComponent from './OrderForm.comp'
import { schema } from './OrderForm.schema'

const useOrderForm = () => {
  const { orderDetail, submit, loading } = useOrderDetail()

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

  const { control, formState, handleSubmit } = formMethods

  // form notifications
  useFormNotification<OrderDetailFormType>({ control })
  // form leave warning
  const FormWarningModal = useFormLeaveWarning({ formState })

  //submit the form
  const onSubmit = (data: OrderDetailFormType) => {
    submit({ ...data, orderDate: convertDate(data.orderDate) })
  }
  const { insert, update, fields, remove } = useFieldArray({ control, name: 'orderLines' })

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

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <HeaderComponent loading={loading} />
        <div className="py-6">
          <OrderFormComponent />
        </div>
      </FormProvider>
      <FormWarningModal />
    </form>
  )

  return { renderForm, setOrderLine, deleteOrderLine, orderLines: fields }
}

export default useOrderForm
