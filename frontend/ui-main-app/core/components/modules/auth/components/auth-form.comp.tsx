import EliLogoComponent from 'core/components/ui/eli-logo.comp'
import { message } from 'core/i18n/src/messages'
import { FormEventHandler, LegacyRef } from 'react'
import { FormattedMessage } from 'react-intl'

import AuthButton from './auth-button.comp'

const authMessages = message.authPage

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  usernameRef: LegacyRef<HTMLInputElement>
  passwordRef: LegacyRef<HTMLInputElement>
  loading: boolean
}

const AuthFormComponent = ({ onSubmit, usernameRef, passwordRef, loading }: Props) => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <EliLogoComponent customClass="mx-auto h-[100px] w-auto" />
        <h2>
          <FormattedMessage id={authMessages.title} />
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-spacing-1 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <FormattedMessage id={authMessages.form.userName} />
              </label>
              <div className="mt-1">
                <input
                  id="text"
                  name="username"
                  type="text"
                  autoComplete="text"
                  ref={usernameRef}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                <FormattedMessage id={authMessages.form.password} />
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  required
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
