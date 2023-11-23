import { yupResolver } from '@hookform/resolvers/yup'
import bcrypt from 'bcryptjs-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { EditUserContext } from '@/pages/administration/user/[uid]'
import type { UserUpdateInput } from '@/types/gql/graphql'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { UserComponent } from './components/User.comp'
import { useUserUpdate } from './hooks/useUserUpdate'
import type { UserUpdateFormType } from './types/form'
import { userUpdateFormSchema } from './types/form'

type Props = {
  userUid?: string
}

export const EditUserContainer = ({ userUid }: Props) => {
  const { userDetail, refetch } = useContext(EditUserContext)

  const formMethods = useForm<UserUpdateFormType>({
    defaultValues: {
      email: userDetail?.email,
      firstName: userDetail?.firstName,
      lastName: userDetail?.lastName,
      isEnabled: userDetail?.isEnabled,
      facility: {
        uid: userDetail?.facility?.code,
        name: userDetail?.facility?.name
      }
    },
    resolver: yupResolver(userUpdateFormSchema)
  })

  const { updateUser } = useUserUpdate()

  const onSubmit = (data: UserUpdateFormType) => {
    const dataToSend: UserUpdateInput = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      isEnabled: data.isEnabled,
      facility: { connect: whereC(data.facility.uid), disconnect: whereC(userDetail?.facility?.code) },
      username: data.email
    }
    if (data.password) {
      dataToSend.passwordHash = bcrypt.hashSync(data.password, 12)
    }

    updateUser({ variables: { where: { uid: userUid }, update: dataToSend } })
  }

  const addRole = (selectedRole?: CodebookType) => {
    if (userDetail?.roles?.find(role => role.uid === selectedRole?.uid)) {
      toast.error('Role already exists!')
      return
    }
    updateUser({
      variables: {
        where: { uid: userUid },
        update: {
          roles: [
            {
              connect: whereN(selectedRole?.uid)
            }
          ]
        }
      }
    }).finally(() => {
      refetch()
    })
  }

  const removeRole = (_, roleUid: string) => {
    updateUser({
      variables: {
        where: { uid: userUid },
        update: {
          roles: [
            {
              disconnect: whereN(roleUid)
            }
          ]
        }
      }
    }).finally(() => {
      refetch()
    })
  }

  return (
    <UserComponent
      {...{
        formMethods,
        title: 'Edit User',
        onSubmit,
        addRole,
        removeRole,
        selectedRoles: userDetail?.roles.map(role => ({ uid: role.uid, name: role.name }))
      }}
    />
  )
}
