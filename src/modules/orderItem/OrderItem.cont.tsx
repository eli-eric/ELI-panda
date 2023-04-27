import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { object, string } from 'yup'

import FormError from '@/components/Notifications/FormError'

import OrderFormContainer from './components/form/OrderForm.cont'
import HeaderComponent from './components/Header.comp'
import { OrderFormType } from './types'

const schema = object({
  name: string().required(),
  supplier: string(),
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

  useEffect(() => {
    formMethods.formState.isSubmitting &&
      formMethods.formState.isDirty &&
      toast.custom(t => <FormError dismiss={toast.dismiss} t={t} />)
  }, [formMethods.formState])

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
