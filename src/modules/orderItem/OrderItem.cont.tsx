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

const schema = object({
  name: string().required(),
  supplier: object(),
  orderStatus: object(),
  orderNumber: string(),
  requestNumber: string(),
  contractNumber: string(),
  notes: string(),
  orderDate: string(),
  orderLines: array().length(1, 'Order must have at least one order line'),
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
  disabledEdit?: boolean
}

const OrderItemContainer = ({ OrderDetail, disabledEdit }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const uid = router.query.uid as string
  const { order } = useEndpoint({ uid })

  const { submit, loading } = useSubmit<string>({
    endpoint: order,
    method: uid ? 'put' : 'post',
    onSuccess: uid => {
      toast.success(`Order ${uid} saved successfully`)
      router.push(PATH.ORDER_EDIT + '/' + uid)
    },
    onError: e => toast.error(e.message, { style: { textAlign: 'left' } })
  })

  const onSubmit = data => {
    console.log(data)
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
  const { control, setValue } = formMethods
  const { insert, update, fields, remove } = useFieldArray<OrderDetailFormType>({ control, name: 'orderLines' })
  const { errors, isSubmitted } = useFormState<OrderDetailFormType>({ control })

  useEffect(() => {
    if (OrderDetail) {
      setValue('orderDate', moment(OrderDetail.orderDate).utc().format('YYYY-MM-DD'))
    }
  }, [OrderDetail, setValue])

  useEffect(() => {
    const ErrorArray = Object.keys(errors || {})
    if (isSubmitted) {
      ErrorArray.length > 0 &&
        ErrorArray.forEach(error => {
          const fieldError = errors[error]
          if (fieldError && 'message' in fieldError) {
            toast.custom(t => <FormError t={t} dismiss={toast.dismiss} message={fieldError.message} />)
          }
        })
    }
  }, [isSubmitted, errors])

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
