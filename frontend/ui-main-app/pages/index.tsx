import AuthFormContainer from 'core/components/auth/auth-form.cont'
import { message } from 'core/i18n/src/messages'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { PATHS } from 'types/constants/paths'

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
