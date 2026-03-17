import { startTransition, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import CheckBox from '@/components/form/CheckBox'
import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { useEmployee } from '@/hooks/graphql/useEmployee'
import { gql } from '@/types/gql'

import { useUserFormFields } from './User.fields'

const GET_FACILITIES = gql(`
  query GetFacilities {
    facilities {
      code
      name
    }
  }
`)

export const UserForm = () => {
    const fields = useUserFormFields()
    const { setValue, control } = useFormContext()
    const { data, error } = useGraphQL(GET_FACILITIES)

    useEffect(() => {
        if (error) {
            toast.error('Failed to fetch facilities')
        }
    }, [error])

    const epmloyeeForm = useWatch({ control, name: 'employee' })

    const { employee } = useEmployee(epmloyeeForm?.uid)

    useEffect(() => {
        startTransition(() => {
            if (employee) {
                setValue('firstName', employee.firstName)
                setValue('lastName', employee.lastName)
                setValue('facility', {
                    uid: employee.facility.code,
                    name: employee.facility.name,
                })
            }
        })
    }, [employee, setValue])

    return (
        <Grid>
            <Col md={6}>
                <Combobox {...fields.employee} filter={[{ key: 'all', value: 'true' }]} />
            </Col>
            <Col md={6} className="items-center sm:pl-2 pt-4">
                <CheckBox {...fields.isEnabled} />
            </Col>
            <Col md={6}>
                <Input {...fields.firstName} />
            </Col>
            <Col md={6}>
                <Input {...fields.lastName} />
            </Col>
            <Col md={6}>
                <Input {...fields.email} type="email" />
            </Col>
            <Col md={6}>
                <Listbox
                    {...fields.facility}
                    codebookResponse={data?.facilities.map(value => ({
                        name: value.name,
                        uid: value.code,
                    }))}
                />
            </Col>
        </Grid>
    )
}
