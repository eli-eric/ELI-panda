import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import uuid from 'react-uuid'
import { array, object, string } from 'yup'

import ErrorPage from '@/components/error/ErrorPage'
import FileManager from '@/components/fileManager/FileManager'
import Card from '@/components/layout/Card'
import Heading from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { convertDate } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
// import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import { message } from '@/i18n/src/messages'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import useOrders from '../orders/hooks/useOrders'
import OrderFormComponent from './components/form/OrderForm.comp'
import HeaderComponent from './components/Header.comp'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import type { OrderDetailFormType, OrderLineFormType } from './types'

const messages = message.ordersPage.orderDetail.sectionHeadings

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

interface Props {
  OrderDetail?: OrderDetailFormType
}

const OrderItemContainer = ({ OrderDetail }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.ORDERS_EDIT)
  const uid = router.query.uid as string
  const { order } = useEndpoint({ uid })
  const { mutate } = useOrders()

  // setting the endpoint and the method for the submit hook
  const { submit, loading } = useSubmit<string>({
    endpoint: order,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      toast.success(`Order ${uid} saved successfully`)
      router.push(uid ? PATH.ORDER + '/' + uid : PATH.ORDERS)
      mutate()
    },
    onError: e => toast.error(e.message)
  })

  //  set the form methods to be used in the order lines
  const formMethods = useForm<OrderDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      orderLines:
        OrderDetail?.orderLines &&
        OrderDetail?.orderLines.map(orderLine => ({ ...orderLine, id: orderLine.uid || uuid() })),
      orderDate: moment().utc().format('YYYY-MM-DD'),
      orderStatus: OrderDetail?.orderStatus || { uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54', name: 'Requested' },
      ...OrderDetail
    }
  })

  //  set the form methods to be used in the order lines
  const { control, setValue, formState } = formMethods
  const { insert, update, fields, remove } = useFieldArray<OrderDetailFormType>({ control, name: 'orderLines' })
  useFormNotification<OrderDetailFormType>({ control })
  const FormWarningModal = useFormLeaveWarning({ formState })

  // set the order date to the current date if it is a new order
  useEffect(() => {
    if (OrderDetail) {
      setValue('orderDate', moment(OrderDetail.orderDate).utcOffset('+02:00').format('YYYY-MM-DD'))
    }
  }, [OrderDetail, setValue])

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

  const onSubmit = (data: OrderDetailFormType) => {
    submit({ ...data, orderDate: convertDate(data.orderDate) })
  }

  return (
    <Fragment>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <HeaderComponent loading={loading} disabledEdit={disabledEdit} />
          <div className="py-6">
            <OrderFormComponent disabledEdit={disabledEdit} />
          </div>
        </FormProvider>
      </form>
      <Card className="flex flex-col justify-between">
        <Heading text={messages.orderLines} />
        <OrderLinesTable
          orderLines={fields as OrderLineFormType[]}
          setOrderLine={setOrderLine}
          deleteOrderLine={deleteOrderLine}
          disabledEdit={disabledEdit}
        />
        {uid && (
          <Fragment>
            <Heading text={messages.files} />
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <FileManager
                  itemType={FILE_TYPE.ORDER}
                  uid={uid}
                  hasEditRole={!disabledEdit && session?.user.roles.includes(ROLE.ORDERS_EDIT)}
                />
              </Suspense>
            </ErrorBoundary>
          </Fragment>
        )}
      </Card>
      <FormWarningModal />
    </Fragment>
  )
}

export default OrderItemContainer
