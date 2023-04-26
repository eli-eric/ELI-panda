import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import ErrorPage from '@/components/error/ErrorPage'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'

import { OrderFormType } from '../../types'
import OrderFormComponent from './OrderForm.comp'

// uprabit formater na order
const formatDataForm = data => ({
  name: data.name,
  description: data.description,
  systemCode: data.systemCode,
  systemAlias: data.systemAlias,
  systemTypeUID: data.systemType?.uid,
  locationUID: data.location?.name,
  ownerUID: data.owner?.name,
  importanceUID: data.importance?.uid,
  zoneUID: data.zone?.uid
})

// změnit schema na order
const schema = object({
  name: string().required(),
  description: string(),
  systemTypeUID: string(),
  systemCode: string(),
  systemAlias: string(),
  locationUID: string(),
  ownerUID: string(),
  importanceUID: string(),
  zoneUID: string()
})

const OrderFormContainer = ({ data, uid }: { data; uid }) => {
  const router = useRouter()
  // změni type na order
  const formMethods = useForm<OrderFormType>({
    resolver: yupResolver(schema)
  })

  const { system } = useEndpoint({
    uid: uid as string
  })

  const { submit, loading, error } = useSubmit({
    endpoint: system,
    method: uid ? 'put' : 'post',
    mutateList: [],
    onSuccess: () => {}
  })

  const onSubmit = data => {
    submit({ ...data, parentUID: router.query.uid })
  }

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <OrderFormComponent />
        {error && <ErrorPage />}
      </FormProvider>
    </form>
  )
}

export default OrderFormContainer
