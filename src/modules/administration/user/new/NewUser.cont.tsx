import { yupResolver } from '@hookform/resolvers/yup'
import bcrypt from 'bcryptjs-react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import { PageHead } from '@/components/layout/PageHead'
import { PageHeaderButtons } from '@/components/layout/PageHead.buttons'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { UserCreateInput } from '@/types/gql/graphql'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { UserForm } from '../components/form/User.form'
import { UserRoles } from '../components/UserRoles'
import { useUserCreate } from '../hooks/useUserCreate'
import type { UserFormType } from '../types/form'
import { userFormSchema } from '../types/form'

export const NewUserContainer = () => {
  const formMethods = useForm<UserFormType>({ resolver: yupResolver(userFormSchema) })

  const { fields, append, remove } = useFieldArray({ control: formMethods.control, name: 'roles' })

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

  const addRole = (selectedRole?: CodebookType) => {
    if (fields?.find(role => role.uid === selectedRole?.uid)) {
      toast.error('Role already exists!')
      return
    }
    if (selectedRole) append({ uid: selectedRole.uid, name: selectedRole.name })
  }

  const removeRole = (roleIndex: number) => {
    remove(roleIndex)
    toast.success('Role removed!')
  }

  return (
    <div>
      <Form
        {...{
          formMethods,
          enableLeaveWarning: true
        }}
      >
        <PageHead>
          <h1 className="text-2xl font-semibold">New User</h1>
          <PageHeaderButtons
            {...{
              onSubmitAndExit: () => {
                formMethods.handleSubmit(onSubmit)()
              },
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
      <UserRoles addRole={addRole} removeRole={removeRole} selectedRoles={fields} />
    </div>
  )
}
