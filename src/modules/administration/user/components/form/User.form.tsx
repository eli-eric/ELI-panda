import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Switch } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import { useLazyEmployee } from '@/hooks/graphql/useLazyEmployee'
import type { Query } from '@/types/gql/graphql'
import { generatePassword } from '@/utils'

import { useUserFormFields } from './User.fields'

const GET_FACILITIES = gql`
  query GetFacilities {
    facilities {
      code
      name
    }
  }
`

export const UserForm = () => {
  const fields = useUserFormFields()
  const { setValue, control } = useFormContext()
  const { data } = useQuery<Query>(GET_FACILITIES, {
    onError: error => {
      toast.error(error.message)
    }
  })

  const [getEmployee, employee] = useLazyEmployee()

  const epmloyeeForm = useWatch({ control, name: 'employee' })

  useEffect(() => {
    if (epmloyeeForm) {
      getEmployee({ variables: { uid: epmloyeeForm.uid } })
    }
  }, [epmloyeeForm, getEmployee])

  useEffect(() => {
    if (employee) {
      setValue('firstName', employee.firstName)
      setValue('lastName', employee.lastName)
      setValue('facility', { uid: employee.facility.code, name: employee.facility.name })
    }
  }, [employee, setValue])

  const generatePasswordHandler = () => {
    const password = generatePassword()
    setValue('password', password)
    setValue('confirmPassword', password)
  }

  return (
    <Grid>
      <Col md={1}>
        <Switch {...fields.isEnabled} />
      </Col>
      <Col md={11}>
        <Combobox
          {...fields.employee}
          customCodebookQuery={{
            f: 'all'
          }}
        />
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
          codebookResponse={data?.facilities.map(value => ({ name: value.name, uid: value.code }))}
        />
      </Col>
      <Col md={6}>
        <Input {...fields.password} type="password">
          <Button primary onClick={generatePasswordHandler}>
            Gen
          </Button>
        </Input>
      </Col>
      <Col md={6}>
        <Input {...fields.confirmPassword} type="password" />
      </Col>
    </Grid>
  )
}
