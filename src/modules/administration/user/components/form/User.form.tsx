import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import toast from 'react-hot-toast'

import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Switch } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import type { Query } from '@/types/gql/graphql'

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
  const router = useRouter()
  const { uid } = router.query
  const fields = useUserFormFields()
  const { data } = useQuery<Query>(GET_FACILITIES, {
    onError: error => {
      toast.error(error.message)
    }
  })

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
      {!uid && (
        <Fragment>
          <Col md={6}>
            <Input {...fields.password} type="password" />
          </Col>
          <Col md={6}>
            <Input {...fields.confirmPassword} type="password" />
          </Col>
        </Fragment>
      )}
    </Grid>
  )
}
