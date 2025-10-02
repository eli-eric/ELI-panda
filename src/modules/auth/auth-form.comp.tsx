import { signIn } from 'next-auth/react'
import { FormattedMessage, useIntl } from 'react-intl'
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
  const { formatMessage: fm } = useIntl()
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
              {fm({ id: message.authPage.chooseFacility })}
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
                {fm({ id: message.authPage.facilities.alps })}
              </Button>
              <Button
                type="button"
                data-testid="beamlines"
                className="w-full"
                onClick={() => signIn('azure-ad-beamlines')}
              >
                {fm({ id: message.authPage.facilities.beamlines })}
              </Button>
              <Button
                variant="outline"
                disabled
                type="button"
                className="w-full"
                onClick={() => signIn('azure-ad-beamlines')}
              >
                {fm({ id: message.authPage.facilities.np })}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthFormComponent
