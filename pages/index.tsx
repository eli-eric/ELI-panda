import AuthAlertComponent from 'components/auth/auth-alert.comp'
import AuthFormComponent from 'components/auth/auth-form.comp'
import { message } from 'i18n/src/messages'
import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { FormEvent, Fragment, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

const messages = message.authPage

const HomePage = () => {
  const intl = useIntl()
  const [authFailed, setAuthFailed] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const userNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

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
    if (!result?.error) {
      setErrorMessage('')
    } else {
      setErrorMessage(result.error)
      setAuthFailed(true)
      setLoading(false)
    }
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
