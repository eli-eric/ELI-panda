import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { object, string } from 'yup'

import OrderFormContainer from './components/form/OrderForm.cont'
import HeaderComponent from './components/Header.comp'
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
  const i = 8

  const formMethods = useForm<OrderFormType>({
    resolver: yupResolver(schema)
  })

  const { formState } = formMethods

  useEffect(() => {
    console.log(formState)
    const ErrorArray = Object.keys(formState?.errors || {})
    formState?.isSubmitSuccessful &&
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
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FormProvider {...formMethods}>
          <HeaderComponent />
          <div className="py-6">
            <OrderFormContainer />
          </div>
        </FormProvider>
      </form>
      <Toaster position="top-right" reverseOrder={true} />
    </Fragment>
  )
}

export default OrderItemContainer
