import { zodResolver } from '@hookform/resolvers/zod'
import bcrypt from 'bcryptjs-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { EditUserContext } from '@/pages/administration/user/[uid]'
import type { GetRolesQuery, UserUpdateInput } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { userUpdateFormSchema } from './components/form/User.schema'
import { UserComponent } from './components/User.comp'
import { useUserUpdate } from './hooks/useUserUpdate'
import type { UserUpdateFormType } from './types/form'

type Props = {
    userUid?: string
    roles: GetRolesQuery['roles']
}

export const EditUserContainer = ({ userUid, roles }: Props) => {
    const { userDetail, refetch } = useContext(EditUserContext)
    const [selectedRoles, setSelectedRoles] = useState<GetRolesQuery['roles']>(
        userDetail?.roles || [],
    )

    const formMethods = useForm<UserUpdateFormType>({
        defaultValues: {
            email: userDetail?.email,
            firstName: userDetail?.firstName,
            lastName: userDetail?.lastName,
            isEnabled: userDetail?.isEnabled,
            facility: {
                uid: userDetail?.facility?.code,
                name: userDetail?.facility?.name,
            },
            employee: userDetail?.employee
                ? {
                      uid: userDetail?.employee?.uid,
                      name: userDetail?.employee?.fullName as string,
                  }
                : undefined,
        },
        resolver: zodResolver(userUpdateFormSchema),
    })

    useEffect(() => {
        if (userDetail?.roles) {
            setSelectedRoles(userDetail.roles)
        }
    }, [userDetail?.roles])

    useEffect(() => {
        if (userDetail) {
            formMethods.reset({
                email: userDetail.email,
                firstName: userDetail.firstName,
                lastName: userDetail.lastName,
                isEnabled: userDetail.isEnabled,
                facility: {
                    uid: userDetail.facility?.code,
                    name: userDetail.facility?.name,
                },
                employee: userDetail.employee
                    ? {
                          uid: userDetail.employee.uid,
                          name: userDetail.employee.fullName as string,
                      }
                    : undefined,
            })
        }
    }, [userDetail, formMethods])

    const onSuccess = () => {
        refetch()
    }

    const { updateUser, loading } = useUserUpdate(onSuccess)

    const onSubmit = (data: UserUpdateFormType, selectedRoles: GetRolesQuery['roles'] = []) => {
        // Get current user roles UIDs
        const currentRoleUids = userDetail?.roles?.map(role => role.uid) || []
        // Get selected roles UIDs
        const selectedRoleUids = selectedRoles.map(role => role.uid)

        // Find roles to connect (new roles that user didn't have before)
        const rolesToConnect = selectedRoles.filter(role => !currentRoleUids.includes(role.uid))
        // Find roles to disconnect (old roles that user no longer has selected)
        const rolesToDisconnect =
            userDetail?.roles?.filter(role => !selectedRoleUids.includes(role.uid)) || []

        const dataToSend: UserUpdateInput = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            isEnabled: data.isEnabled,
            facility: {
                connect: whereC(data.facility.uid),
                disconnect: whereC(userDetail?.facility?.code),
            },
            employee: {
                connect: data.employee ? whereN(data.employee?.uid) : undefined,
                disconnect: whereN(userDetail?.employee?.uid),
            },
            username: data.email,
        }

        // Only add roles if there are changes
        if (rolesToConnect.length > 0 || rolesToDisconnect.length > 0) {
            dataToSend.roles = [
                {
                    connect: rolesToConnect.map(role => whereN(role.uid)),
                    disconnect: rolesToDisconnect.map(role => whereN(role.uid)),
                },
            ]
        }

        if (data.password) {
            dataToSend.passwordHash = bcrypt.hashSync(data.password, 12)
        }

        updateUser({ where: { uid: userUid }, update: dataToSend })
    }

    const addRole = (selectedRole?: CodebookType) => {
        if (selectedRole && !selectedRoles.find(role => role.uid === selectedRole.uid)) {
            setSelectedRoles(prev => [...prev, selectedRole as GetRolesQuery['roles'][0]])
        } else {
            toast.error('Role already exists!')
        }
    }

    const removeRole = (roleUid: string) => {
        setSelectedRoles(prev => prev.filter(role => role.uid !== roleUid))
    }

    return (
        <UserComponent
            {...{
                formMethods,
                title: 'Edit User',
                onSubmit,
                addRole,
                removeRole,
                assignedRoles: selectedRoles,
                roles,
                loading,
                selectedRoles,
            }}
        />
    )
}
