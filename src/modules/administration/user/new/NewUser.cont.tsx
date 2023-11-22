import { gql, useQuery } from '@apollo/client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import bcrypt from 'bcryptjs-react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { PageHead } from '@/components/layout/PageHead'
import { PageHeaderButtons } from '@/components/layout/PageHead.buttons'
import { Badge } from '@/components/visuals/Badge'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { Facility, Query, UserCreateInput } from '@/types/gql/graphql'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { UserForm } from '../components/User.form'
import { useUserCreate } from '../hooks/useUserCreate'

const GET_ROLES = gql`
  query GetRoles {
    roles {
      name
      code
      uid
    }
  }
`
type UserFormType = {
  email: string
  facility: Facility
  firstName: string
  isEnabled: boolean
  lastName: string
  password: string
  confirmPassword: string
  roles: CodebookType[]
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  facility: yup.mixed<Facility>().required(),
  firstName: yup.string().required(),
  isEnabled: yup.boolean().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
  roles: yup.array().of(yup.mixed<CodebookType>().required()).required()
})

export const NewUserContainer = () => {
  const formMethods = useForm<UserFormType>({ resolver: yupResolver(schema) })
  const formRolesMethods = useForm()

  const { fields, append, remove } = useFieldArray({ control: formMethods.control, name: 'roles' })

  const selectedRole = formRolesMethods.watch('role')

  const { data } = useQuery<Query>(GET_ROLES, {
    onError: error => {
      toast.error(error.message)
    }
  })

  const { createUser } = useUserCreate()

  const onSubmit = (data: UserFormType) => {
    const dataToSend: UserCreateInput[] = [
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isEnabled: data.isEnabled,
        passwordHash: bcrypt.hashSync(data.password, 12),
        roles: { connect: fields?.map(role => whereN(role.uid)) },
        facility: { connect: whereC(data.facility.uid) },
        username: data.email
      }
    ]
    createUser({ variables: { input: dataToSend } })
  }

  return (
    <div>
      <Form
        {...{
          formMethods,
          onSubmit: () => {},
          enableLeaveWarning: true
        }}
      >
        <PageHead>
          <h1 className="text-2xl font-semibold">New User</h1>
          <PageHeaderButtons
            {...{
              onSubmitAndExit: () => {},
              onSubmit: () => {
                formMethods.handleSubmit(onSubmit)()
              },
              role: ROLE.ADMIN,
              exitTo: PATH.ADMIN_USERS
            }}
          />
        </PageHead>
        <Card>
          <UserForm />
        </Card>
      </Form>
      <DevTool control={formMethods.control} />
      <Form {...{ formMethods: formRolesMethods }}>
        <Card>
          <Grid>
            <Col md={6}>
              <Listbox
                name="role"
                customLabel="Role"
                codebookResponse={data?.roles.map(role => ({ uid: role.uid, name: role.name }))}
              >
                <PlusButton
                  primary
                  buttonSize="large"
                  className="ml-1 px-[10px] py-[10px] self-baseline mt-5"
                  type="button"
                  onClick={() => {
                    if (fields?.find(role => role.uid === selectedRole.uid)) {
                      toast.error('Role already exists!')
                      return
                    }
                    append({ uid: selectedRole.uid, name: selectedRole.name })
                  }}
                />
              </Listbox>
            </Col>
            <Col md={6}>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-900">{'Selected Roles:'}</label>
                <div className="flex-grow">
                  {fields?.map((role, i) => (
                    <Badge key={role.uid}>
                      <div className="flex flex-row">
                        {role.name}
                        <XMarkIcon
                          className="ml-2 h-4 w-4 cursor-pointer hover:text-red-500"
                          onClick={() => remove(i)}
                        />
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
          </Grid>
        </Card>
      </Form>
    </div>
  )
}
