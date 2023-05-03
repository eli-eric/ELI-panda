import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import uuid from 'react-uuid'
import { array, object, string } from 'yup'

import FileManager from '@/components/fileManager/FileManager'
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
  supplier: object().shape({
    name: string().required(),
    uid: string().required()
  }),
  orderStatus: object().shape({
    name: string().required(),
    uid: string().required()
  }),
  orderNumber: string(),
  requestNumber: string(),
  contractNumber: string(),
  notes: string(),
  orderDate: string(),
  orderLines: array()
    .of(
      object({
        name: string().required(),
        catalogueNumber: string().required(),
        system: object()
          .shape({
            name: string().required(),
            uid: string().required()
          })
          .required(),
        price: string()
      })
    )
    .required()
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
      router.push(PATH.ORDER_DETAIL + '/' + uid)
    },
    onError: e => toast.error(e.message)
  })

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
  const { formState, control, setValue } = formMethods
  const { insert, update, fields, remove } = useFieldArray<OrderDetailFormType>({ control, name: 'orderLines' })

  useEffect(() => {
    if (OrderDetail) {
      setValue('orderDate', moment(OrderDetail.orderDate).utc().format('YYYY-MM-DD'))
    }
  }, [OrderDetail, setValue])

  useEffect(() => {
    const ErrorArray = Object.keys(formState?.errors || {})
    formState?.isSubmitting &&
      ErrorArray.length > 0 &&
      ErrorArray.forEach(error => {
        const fieldError = formState?.errors[error]
        if (fieldError && 'message' in fieldError) {
          toast.error(fieldError.message as string)
        }
      })
  }, [formState])

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
      <Toaster position="top-right" reverseOrder={true} />
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
