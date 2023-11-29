import { gql, useQuery } from '@apollo/client'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Switch } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
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
  const { setValue } = useFormContext()
  const { data } = useQuery<Query>(GET_FACILITIES, {
    onError: error => {
      toast.error(error.message)
    }
  })

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
      <Col md={5}>
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
