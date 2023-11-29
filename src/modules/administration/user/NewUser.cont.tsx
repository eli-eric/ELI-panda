import { yupResolver } from '@hookform/resolvers/yup'
import bcrypt from 'bcryptjs-react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { UserCreateInput } from '@/types/gql/graphql'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { userFormSchema } from './components/form/User.schema'
import { UserComponent } from './components/User.comp'
import { useUserCreate } from './hooks/useUserCreate'
import type { UserCreateFormType } from './types/form'

export const NewUserContainer = () => {
  const formMethods = useForm<UserCreateFormType>({ resolver: yupResolver(userFormSchema) })

  const { fields, append, remove } = useFieldArray({ control: formMethods.control, name: 'roles' })

  const { createUser } = useUserCreate()

  const onSubmit = (data: UserCreateFormType) => {
    const dataToSend: UserCreateInput[] = [
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isEnabled: data.isEnabled,
        passwordHash: bcrypt.hashSync(data.password, 12),
        roles: { connect: fields?.map(role => whereN(role.uid)) },
        facility: { connect: whereC(data.facility.uid) },
        username: data.email,
        passwordToChange: true,
        employee: { connect: whereN(data.employee.uid) }
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
    <UserComponent
      {...{
        formMethods,
        title: 'New User',
        onSubmit,
        addRole,
        removeRole,
        selectedRoles: fields
      }}
    />
  )
}
