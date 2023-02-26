import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import EliLogoComponent from '@/components/shared/eli-logo.comp'
import { InputWithError } from '@/components/shared/form/Input'

import { Button } from '../ui/Buttons'

const authMessages = message.authPage
const { title, form } = message.authPage
const authButtonMessages = message.authPage.form.button

export type AuthForm = {
  username: string
  password: string
}

interface Props {
  onSubmit: (data: AuthForm) => void
  register: UseFormRegister<AuthForm>
  formState: FormState<AuthForm>
  handleSubmit: UseFormHandleSubmit<AuthForm>
  loading: boolean
}

const AuthFormComponent = ({
  onSubmit,
  register,
  formState,
  handleSubmit,
  loading,
}: Props) => {
  const { errors } = formState

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <EliLogoComponent customClass="mx-auto h-[100px] w-auto" />
        <h2>
          <FormattedMessage id={title} />
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-spacing-1 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <FormattedMessage id={form.userName} />
              </label>
              <div className="mt-1">
                <InputWithError
                  id="text"
                  name="username"
                  rounded="rounded-md"
                  type="text"
                  autoComplete="text"
                  register={register}
                />
                <p className="text-xs text-red-500">
                  {errors.username?.message}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                <FormattedMessage id={form.password} />
              </label>
              <div className="mt-1">
                <InputWithError
                  id="password"
                  rounded="rounded-md"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  register={register}
                />
                <p className="text-xs text-red-500">
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <Button
              primary
              loading={loading}
              type="submit"
              className="w-full justify-center"
            >
              <FormattedMessage
                id={
                  loading
                    ? authButtonMessages.isLoading
                    : authButtonMessages.default
                }
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthFormComponent
