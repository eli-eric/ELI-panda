import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect } from 'react'
import { FormProvider, useFieldArray, useForm, useFormState } from 'react-hook-form'
import toast from 'react-hot-toast'
import uuid from 'react-uuid'
import { array, object, string } from 'yup'

import FileManager from '@/components/fileManager/FileManager'
import FormError from '@/components/Notifications/FormError'
import { convertDate } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import OrderFormComponent from './components/form/OrderForm.comp'
import HeaderComponent from './components/Header.comp'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import { OrderDetailFormType, OrderLineFormType } from './types'

const numberSchema = {
  atLeastOneFilled: string().test(
    'At least one of Order Number, Request Number or Contract Number must be filled',
    function () {
      const { orderNumber, requestNumber, contractNumber } = this.parent
      return Boolean(orderNumber || requestNumber || contractNumber)
    }
  )
}

const schema = object({
  name: string().required("Order's name is required"),
  supplier: object(),
  orderStatus: object(),
  orderNumber: numberSchema.atLeastOneFilled,
  requestNumber: numberSchema.atLeastOneFilled,
  contractNumber: numberSchema.atLeastOneFilled,
  notes: string(),
  orderDate: string(),
  orderLines: array().min(1, 'Order must have at least one Order Line')
})

interface Props {
  OrderDetail?: OrderDetailFormType
  disabledEdit?: boolean
}

const OrderItemContainer = ({ OrderDetail, disabledEdit }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const uid = router.query.uid as string
  const { order } = useEndpoint({ uid })

  // setting the endpoint and the method for the submit hook
  const { submit, loading } = useSubmit<string>({
    endpoint: order,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      toast.success(`Order ${uid} saved successfully`)
      router.push(PATH.ORDER_EDIT + '/' + uid)
    },
    onError: e => toast.error(e.message, { style: { textAlign: 'left' } })
  })

  //  submit the form
  const onSubmit = data => {
    submit({ ...data, orderDate: convertDate(data.orderDate) })
  }

  const formMethods = useForm<OrderDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      orderLines:
        OrderDetail?.orderLines &&
        OrderDetail?.orderLines.map(orderLine => ({ ...orderLine, id: orderLine.uid || uuid() })),
      orderDate: moment().utc().format('YYYY-MM-DD'),
      ...OrderDetail
    }
  })

  //  set the form methods to be used in the order lines
  const { control, setValue } = formMethods
  const { insert, update, fields, remove } = useFieldArray<OrderDetailFormType>({ control, name: 'orderLines' })
  const { errors, isSubmitted } = useFormState<OrderDetailFormType>({ control })

  // set the order date to the current date if it is a new order
  useEffect(() => {
    if (OrderDetail) {
      setValue('orderDate', moment(OrderDetail.orderDate).utc().format('YYYY-MM-DD'))
    }
  }, [OrderDetail, setValue])

  //  check if there is any error in the form and show it
  useEffect(() => {
    const ErrorArray = Object.keys(errors || {})
    if (isSubmitted) {
      ErrorArray.length > 0 &&
        ErrorArray.forEach(error => {
          const fieldError = errors[error]
          if (fieldError && 'message' in fieldError) {
            toast.custom(t => <FormError t={t} dismiss={toast.dismiss} message={fieldError?.message as string} />)
          }
        })
    }
  }, [isSubmitted, errors])

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
      <OrderLinesTable
        orderLines={fields as OrderLineFormType[]}
        setOrderLine={setOrderLine}
        deleteOrderLine={deleteOrderLine}
        disabledEdit={disabledEdit}
      />
      {uid && (
        <div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-1 justify-between">
          <FileManager
            itemType={FILE_TYPE.ORDER}
            uid={uid}
            hasEditRole={!disabledEdit && session?.user.roles.includes(ROLE.ORDERS_EDIT)}
          />
        </div>
      )}
    </Fragment>
  )
}

export default OrderItemContainer
