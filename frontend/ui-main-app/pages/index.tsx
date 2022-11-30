import AuthFormContainer from 'core/components/modules/auth/auth-form.cont'
import { message } from 'core/i18n/src/messages'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

const messages = message.authPage

const HomePage = () => {
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

export default HomePage
