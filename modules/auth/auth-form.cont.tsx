import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { FormEvent, Fragment, useRef, useState } from 'react'
import { PATHS } from 'types/constants/paths'

import AuthAlertComponent from './components/auth-alert.comp'
import AuthFormComponent from './components/auth-form.comp'

const AuthFormContainer = () => {
  const router = useRouter()
  const [authFailed, setAuthFailed] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const userNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const callbackUrl = (router.query?.callbackUrl as string) ?? PATHS.DASHBOARD

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
      setLoading(false)
      router.push(callbackUrl)
    } else {
      setErrorMessage(result.error)
      setAuthFailed(true)
      setLoading(false)
    }
  }

  return (
    <Fragment>
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

export default AuthFormContainer
