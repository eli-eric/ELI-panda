import { signIn } from 'next-auth/react'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { Button } from '@/components/Buttons'
import EliLogoComponent from '@/components/eli-logo.comp'

const { title } = message.authPage

const AuthFormComponent = () => {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <EliLogoComponent customClass="mx-auto h-[100px] w-auto" />
        <h2>
          <FormattedMessage id={title} />
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 border border-spacing-1 shadow sm:rounded-lg sm:px-10">
          <div className="pb-6">
            <Button
              primary
              disabled
              type="button"
              className="mt-4 w-full justify-center"
              onClick={() => signIn('azure-ad-beamlines')}
            >
              ELI - ALPS
            </Button>
            <Button
              primary
              type="button"
              testid="beamlines"
              className="mt-4 w-full justify-center"
              onClick={() => signIn('azure-ad-beamlines')}
            >
              ELI - BEAMLINES
            </Button>
            <Button
              primary
              disabled
              type="button"
              className="mt-4 w-full justify-center"
              onClick={() => signIn('azure-ad-beamlines')}
            >
              ELI - NP
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthFormComponent
