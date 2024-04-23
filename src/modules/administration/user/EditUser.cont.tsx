import { yupResolver } from '@hookform/resolvers/yup'
import bcrypt from 'bcryptjs-react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { EditUserContext } from '@/pages/administration/user/[uid]'
import type { Role, UserUpdateInput } from '@/types/gql/graphql'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { userUpdateFormSchema } from './components/form/User.schema'
import { UserComponent } from './components/User.comp'
import { useUserUpdate } from './hooks/useUserUpdate'
import type { UserUpdateFormType } from './types/form'

type Props = {
  userUid?: string
  roles: Role[]
}

export const EditUserContainer = ({ userUid, roles }: Props) => {
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
      },
      employee: userDetail?.employee
        ? {
            uid: userDetail?.employee?.uid,
            name: userDetail?.employee?.fullName as string
          }
        : undefined
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
      facility: {
        connect: whereC(data.facility.uid),
        disconnect: whereC(userDetail?.facility?.code)
      },
      employee: {
        connect: data.employee ? whereN(data.employee?.uid) : undefined,
        disconnect: whereN(userDetail?.employee?.uid)
      },
      username: data.email
    }
    if (data.password) {
      dataToSend.passwordHash = bcrypt.hashSync(data.password, 12)
    }

    updateUser({ where: { uid: userUid }, update: dataToSend })
  }

  const addRole = (selectedRole?: CodebookType) => {
    if (userDetail?.roles?.find(role => role.uid === selectedRole?.uid)) {
      toast.error('Role already exists!')
      return
    }
    updateUser(
      {
        where: { uid: userUid },
        update: {
          roles: [
            {
              connect: [whereN(selectedRole?.uid)]
            }
          ]
        }
      },
      {
        onSuccess: () => {
          refetch()
        }
      }
    )
  }

  const removeRole = (roleUid: string) => {
    updateUser(
      {
        where: { uid: userUid },
        update: {
          roles: [
            {
              disconnect: [whereN(roleUid)]
            }
          ]
        }
      },
      {
        onSuccess: () => {
          refetch()
        }
      }
    )
  }

  return (
    <UserComponent
      {...{
        formMethods,
        title: 'Edit User',
        onSubmit,
        addRole,
        removeRole,
        assignedRoles: userDetail?.roles,
        roles
      }}
    />
  )
}
