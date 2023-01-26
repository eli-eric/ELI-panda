import AuthAlertComponent from 'components/auth/auth-alert.comp'
import AuthFormComponent from 'components/auth/auth-form.comp'
import { message } from 'i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FormEvent, Fragment, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { PATH } from 'types/constants/paths'

const messages = message.authPage

const HomePage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const router = useRouter()
  const [authFailed, setAuthFailed] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const userNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? PATH.DASHBOARD)
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setAuthFailed(false)
    setLoading(true)
    const enteredUserName = userNameRef.current?.value
    const enteredPassword = passwordRef.current?.value
    const result = await signIn('credentials', {
      redirect: false,
      username: enteredUserName,
      password: enteredPassword
    })
      .then(e => {
        if (e?.error) {
          setErrorMessage(e.error)
          setAuthFailed(true)
          setLoading(false)
        }
      })
      .finally(() => {
        setErrorMessage('')
        setLoading(false)
        router.replace(callbackUrl, undefined, { shallow: false })
      })
  }

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <AuthFormComponent
        onSubmit={handleLoginSubmit}
        usernameRef={userNameRef}
        passwordRef={passwordRef}
        loading={loading}
      />
      {authFailed && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <AuthAlertComponent message={errorMessage} />{' '}
        </div>
      )}
    </Fragment>
  )
}

export default HomePage
