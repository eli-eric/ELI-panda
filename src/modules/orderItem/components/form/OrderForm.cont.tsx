import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import uuid from 'react-uuid'
import { array, object, string } from 'yup'

import { convertDate } from '@/helpers/formatters'
import useSubmit from '@/hooks/fetch/useSubmit'
import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import useOrders from '@/modules/orders/hooks/useOrders'
import { PATH } from '@/types/constants/paths'

import useOrderDetail from '../../hooks/useOrderDetail'
import type { OrderDetailFormType, OrderLineFormType } from '../../types'
import HeaderComponent from '../Header.comp'
import OrderFormComponent from './OrderForm.comp'

const schema = object({
  name: string().required("Order's name is required"),
  supplier: object().nullable(),
  orderStatus: object(),
  orderNumber: string(),
  requestNumber: string(),
  contractNumber: string(),
  notes: string(),
  orderDate: string(),
  orderLines: array().min(1, 'Order must have at least one Order Line'),
  atLeastOneFilled: string().test(
    'at-least-one-filled',
    'At least one of Order Number, Request Number or Contract Number must be filled',
    function () {
      const { orderNumber, requestNumber, contractNumber } = this.parent
      return Boolean(orderNumber || requestNumber || contractNumber)
    }
  )
})

const useOrderForm = () => {
  const router = useRouter()
  const { orderDetail, orderEndpoint, uid, mutate: mutateDetail } = useOrderDetail()

  // useOrders hook to refresh the orders list after saving
  const { mutate } = useOrders()

  //submit hook
  const { submit, loading } = useSubmit<string>({
    endpoint: orderEndpoint,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      mutateDetail()
      mutate()
      toast.success(`Order ${uid} saved successfully`)
      router.push(uid ? PATH.ORDER + '/' + uid : PATH.ORDERS)
    },
    onError: e => toast.error(e.message)
  })

  // initialize the form
  const formMethods = useForm<OrderDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...orderDetail,
      orderLines:
        orderDetail?.orderLines &&
        orderDetail?.orderLines.map(orderLine => ({ ...orderLine, id: orderLine.uid || uuid() })),
      orderDate: moment().utc().format('YYYY-MM-DD'),
      orderStatus: orderDetail?.orderStatus || { uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54', name: 'Requested' }
    }
  })
  const { control, setValue, formState, handleSubmit } = formMethods

  // set the order date to the current date if it is a new order
  useEffect(() => {
    if (orderDetail) {
      setValue('orderDate', moment(orderDetail.orderDate).utcOffset('+02:00').format('YYYY-MM-DD'))
    }
  }, [orderDetail, setValue])

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
