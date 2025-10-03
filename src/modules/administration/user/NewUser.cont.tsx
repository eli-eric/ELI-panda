import { zodResolver } from '@hookform/resolvers/zod'
import bcrypt from 'bcryptjs-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ROLE } from '@/types/constants/roles'
import type { GetRolesQuery, UserCreateInput } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { userFormSchema } from './components/form/User.schema'
import { UserComponent } from './components/User.comp'
import { useUserCreate } from './hooks/useUserCreate'
import type { UserCreateFormType } from './types/form'

type Props = {
  roles: GetRolesQuery['roles']
}
export const NewUserContainer = ({ roles }: Props) => {
  const defaultRoles = [
    ROLE.BASICS,
    ROLE.CATALOGUE_VIEW,
    ROLE.SYSTEMS_VIEW,
    ROLE.ROOM_CARD_VIEW
  ]
  const defaultAssignedRoles =
    roles?.filter(role => defaultRoles.includes(role.code as ROLE)) || []

  const [selectedRoles, setSelectedRoles] =
    useState<GetRolesQuery['roles']>(defaultAssignedRoles)

  const formMethods = useForm<UserCreateFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      isEnabled: true
    }
  })

  const { createUser, loading } = useUserCreate()

  const onSubmit = (
    data: UserCreateFormType,
    submittedSelectedRoles: GetRolesQuery['roles'] = []
  ) => {
    const rolesToUse =
      submittedSelectedRoles.length > 0 ? submittedSelectedRoles : selectedRoles
    const dataToSend: UserCreateInput[] = [
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        isEnabled: data.isEnabled,
        passwordHash: bcrypt.hashSync(data.password, 12),
        roles: { connect: rolesToUse.map(role => whereN(role.uid)) },
        facility: { connect: whereC(data.facility.uid) },
        username: data.email,
        passwordToChange: true,
        employee: data.employee
          ? { connect: whereN(data.employee?.uid) }
          : undefined
      }
    ]
    createUser({ input: dataToSend })
  }

  const addRole = (selectedRole?: CodebookType) => {
    if (
      selectedRole &&
      !selectedRoles.find(role => role.uid === selectedRole.uid)
    ) {
      setSelectedRoles(prev => [
        ...prev,
        selectedRole as GetRolesQuery['roles'][0]
      ])
    } else {
      toast.error('Role already exists!')
    }
  }

  const removeRole = (uid: string) => {
    setSelectedRoles(prev => prev.filter(role => role.uid !== uid))
  }

  return (
    <UserComponent
      {...{
        formMethods,
        title: 'New User',
        onSubmit,
        addRole,
        removeRole,
        roles,
        assignedRoles: selectedRoles,
        loading,
        selectedRoles
      }}
    />
  )
}
