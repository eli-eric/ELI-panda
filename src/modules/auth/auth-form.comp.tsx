import { signIn } from 'next-auth/react'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import EliLogoComponent from '@/components/eli-logo.comp'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const { title } = message.authPage

const AuthFormComponent = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <EliLogoComponent customClass="h-[100px] w-auto" />
            </div>
            <CardTitle className="text-2xl text-center">
              <FormattedMessage id={title} />
            </CardTitle>
            <CardDescription className="text-center">
              Choose your ELI facility to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                disabled
                type="button"
                className="w-full"
                onClick={() => signIn('azure-ad-beamlines')}
              >
                ELI - ALPS
              </Button>
              <Button
                type="button"
                data-testid="beamlines"
                className="w-full"
                onClick={() => signIn('azure-ad-beamlines')}
              >
                ELI - BEAMLINES
              </Button>
              <Button
                variant="outline"
                disabled
                type="button"
                className="w-full"
                onClick={() => signIn('azure-ad-beamlines')}
              >
                ELI - NP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthFormComponent
