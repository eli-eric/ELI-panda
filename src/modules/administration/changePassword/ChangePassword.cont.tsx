import { yupResolver } from '@hookform/resolvers/yup'
import bcrypt from 'bcryptjs-react'
import { useSession } from 'next-auth/react'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

import { useUserUpdate } from '../user/hooks/useUserUpdate'

type FormType = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const GET_USER_PASSWORD = gql(`
  query UserPWDQuery($uid: ID!) {
    users(where: { uid: $uid }) {
      uid
      passwordHash
    }
  }
`)

const makeSchema = () =>
  yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .test('len', 'Must be longer then 8 characters', val => val?.length >= 8)
      .test(
        'password',
        'Password must contain at least one uppercase, one lowercase and one number',
        val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(val || '')
      )
      .test(
        'password',
        'Password must contain at least one special character',
        val => /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(val || '')
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password is required')
  })
export const ChangePasswordContainer: FC = () => {
  const userUid = useSession().data?.user?.uid

  const { data: userPassword, isLoading } = useGraphQL(GET_USER_PASSWORD, {
    variables: {
      uid: userUid || ''
    },
    enabled: !!userUid
  })

  const formMethods = useForm<FormType>({ resolver: yupResolver(makeSchema()) })

  const onSuccess = () => {
    toast.success('Password was updated successfully')
    formMethods.reset()
  }

  const { updateUser, loading } = useUserUpdate(onSuccess)

  const onSubmit = (passwordData: FormType) => {
    const passwordHash = userPassword?.users[0]?.passwordHash
    const confirmed = bcrypt.compareSync(
      passwordData.currentPassword,
      passwordHash || ''
    )
    if (confirmed) {
      const dataToSend = {
        passwordHash: bcrypt.hashSync(passwordData.newPassword, 12),
        passwordToChange: false
      }
      updateUser({
        where: { uid: userUid },
        update: dataToSend
      })
    } else {
      toast.error('Wrong current password!')
      formMethods.setError('currentPassword', {
        message: 'Wrong current password'
      })
    }
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <div>
        <div className=" space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10  sm:pb-0">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
            >
              Current password
            </label>
            <Input
              type="password"
              rounded="rounded-md"
              name="currentPassword"
              id="currentPassword"
              autoComplete="password"
            />
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
            >
              New password
            </label>
            <Input
              type="password"
              rounded="rounded-md"
              name="newPassword"
              id="newPassword"
              autoComplete="password"
            />
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 sm:pt-1.5"
            >
              Confirm new password
            </label>
            <Input
              type="password"
              rounded="rounded-md"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="password"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            onClick={() => {
              formMethods.reset()
            }}
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading || isLoading}>
            Update Password
          </Button>
        </div>
      </div>
    </Form>
  )
}
