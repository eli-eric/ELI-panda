import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useServiceMutation } from '../services/hooks/useServiceMutation'
import { useServiceType } from '../services/hooks/useServiceType'
import { useServiceTypeList } from '../services/hooks/useServiceTypeList'
import type { ServiceTypeResponse } from '../services/types/responses'
import { ServiceProperties } from './form/serivce-properties.cont'
import { ServiceTypeForm } from './form/service-type.form'

interface Props {
    data?: ServiceTypeResponse
    uid?: string
}

export const ServiceTypeContainer: FC<Props> = ({ data, uid }) => {
    const router = useRouter()

    const formMethods = useForm({
        defaultValues: {
            ...data,
            properties: data?.properties?.reduce((acc, item) => {
                acc[item] = true
                return acc
            }, {}),
        },
    })

    const { mutate, isPending } = useServiceMutation({ uid })
    const { refetch: refetchService } = useServiceType(uid)
    const { refetch } = useServiceTypeList()

    const submit = (data, exit?: boolean) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { properties, ...rest } = data
        const newPropperties = properties
            ? Object.keys(data.properties)
                  .map(key => (data.properties[key] ? key : null))
                  .filter(Boolean)
            : []
        const newData = { ...rest, properties: newPropperties }
        mutate(newData, {
            onSuccess: ({ data }) => {
                if (exit) {
                    router.push(PATH.SERVICES)
                }
                if (uid) {
                    refetch()
                    refetchService()
                } else {
                    router.push(PATH.SERVICE + '/' + data.uid)
                }
            },
            onError: () => {},
        })
    }

    const onSubmit = data => {
        submit(data)
    }
    const onSubmitAndExit = data => {
        submit(data, true)
    }

    return (
        <Form className="h-screen overflow-auto" formMethods={formMethods}>
            <HeaderWithButtons
                loading={isPending}
                customElement={<h1>{data ? 'Edit Service' : 'New Service'}</h1>}
                editRole={ROLE.SERVICE_EDIT}
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
