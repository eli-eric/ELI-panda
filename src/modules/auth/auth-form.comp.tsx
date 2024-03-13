import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import * as yup from 'yup'

import { Button } from '@/components/Buttons'
import EliLogoComponent from '@/components/eli-logo.comp'
import { Input } from '@/components/form/Input'

const { title, form } = message.authPage
const authButtonMessages = message.authPage.form.button

export type AuthForm = {
  username: string
  password: string
}

interface Props {
  onSubmit: (data: AuthForm) => void
  loading: boolean
}

const AuthFormComponent = ({ onSubmit, loading }: Props) => {
  const authValidationSchema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required()
  })

  const formMethods = useForm<AuthForm>({
    resolver: yupResolver(authValidationSchema)
  })
  const { handleSubmit, formState } = formMethods
  const { errors } = formState

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <EliLogoComponent customClass="mx-auto h-[100px] w-auto" />
        <h2>
          <FormattedMessage id={title} />
        </h2>
      </div>
      <FormProvider {...formMethods}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 border border-spacing-1 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  <FormattedMessage id={form.userName} />
                </label>
                <div className="mt-1">
                  <Input id="text" name="username" rounded="rounded-md" type="text" autoComplete="text" />
                  <p className="text-xs text-red-500">{errors.username?.message}</p>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  <FormattedMessage id={form.password} />
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    rounded="rounded-md"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <p className="text-xs text-red-500">{errors.password?.message}</p>
                </div>
              </div>

              <Button primary loading={loading} type="submit" className="w-full justify-center">
                <FormattedMessage id={loading ? authButtonMessages.isLoading : authButtonMessages.default} />
              </Button>
            </form>

            <Button primary type="button" className="mt-4 w-full justify-center" onClick={() => signIn('azure-ad')}>
              ELI - Beamlines SSO
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  )
}

export default AuthFormComponent
