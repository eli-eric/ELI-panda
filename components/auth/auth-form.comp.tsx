import EliLogoComponent from 'components/ui/eli-logo.comp'
import { Input } from 'components/ui/form/Input'
import { message } from 'i18n/src/messages'
import { FieldValues, FormState, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import AuthButton from './auth-button.comp'

const authMessages = message.authPage
const { title, form } = message.authPage

interface Props {
  onSubmit: (data: any) => void
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  loading: boolean
}

const AuthFormComponent = ({ onSubmit, register, formState, handleSubmit, loading }: Props) => {
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
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <FormattedMessage id={form.userName} />
              </label>
              <div className="mt-1">
                <Input
                  id="text"
                  name="username"
                  type="text"
                  autoComplete="text"
                  register={register}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                <FormattedMessage id={form.password} />
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  register={register}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <AuthButton loading={loading} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthFormComponent
