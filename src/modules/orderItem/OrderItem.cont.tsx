import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { object, string } from 'yup'

import OrderFormComponent from './components/form/OrderForm.comp'
import HeaderComponent from './components/Header.comp'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import { OrderFormType } from './types'

const schema = object({
  name: string().required(),
  supplier: string().required(),
  orderStatus: string(),
  orderNumber: string(),
  requestNumber: string(),
  contractNumber: string(),
  notes: string(),
  orderDate: string()
})

const OrderItemContainer = () => {
  const formMethods = useForm<OrderFormType>({
    resolver: yupResolver(schema)
  })

  const { formState, watch } = formMethods

  const orderLines = watch('orderLines')

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

  const onSubmit = data => {
    console.log(data)
    toast('Here is your toast.')
  }

  return (
    <Fragment>
      <Toaster position="top-right" reverseOrder={true} />
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <HeaderComponent />
          <div className="py-6">
            <OrderFormComponent />
          </div>
        </FormProvider>
      </form>
      <OrderLinesTable orderLines={orderLines} />
    </Fragment>
  )
}

export default OrderItemContainer
