import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { ROLE } from '@/types/constants/roles'

import { useServiceMutation } from '../services/hooks/useServiceMutation'
import { useServiceType } from '../services/hooks/useServiceType'
import { ServiceProperties } from './form/serivce-properties.cont'
import { ServiceTypeForm } from './form/service-type.form'

interface Props {
  uid?: string
}

export const ServiceTypeContainer: FC<Props> = ({ uid }) => {
  const formMethods = useForm()
  const { mutate, isPending } = useServiceMutation({ uid })
  const { data } = useServiceType(uid)

  const onSubmit = data => {
    //eslint-disable-next-line
    const { properties, ...rest } = data
    const propertiesArray = Object.keys(data.properties)
      .map(key => (data.properties[key] ? key : null))
      .filter(Boolean)
    const newData = { ...rest, properties: propertiesArray }
    mutate(newData)
  }
  const onSubmitAndExit = () => {
    //TODO: Implement onSubmitAndExit
    console.log('Submit and exit')
  }

  return (
    <Form className="h-screen overflow-auto" formMethods={formMethods}>
      <HeaderWithButtons
        loading={isPending}
        customElement={<h1>New Service</h1>}
        editRole={ROLE.CATALOGUE_EDIT}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        onSubmitAndExit={formMethods.handleSubmit(onSubmitAndExit)}
      />
      <Card>
        <ServiceTypeForm />
        <ServiceProperties />
      </Card>
    </Form>
  )
}
