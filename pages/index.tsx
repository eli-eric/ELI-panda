import { message } from 'i18n/src/messages'
import AuthFormContainer from 'modules/auth/auth-form.cont'
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
