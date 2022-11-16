import AuthFormContainer from 'core/components/auth/auth-form.cont'
import { useAuth } from 'core/helpers/hooks/useAuth'
import { message } from 'core/i18n/src/messages'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

const messages = message.authPage

const AuthPage = () => {
  useAuth()
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <AuthFormContainer />
    </Fragment>
  )
}

export default AuthPage
