import { FormEvent, Fragment, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import AuthFormComponent from './auth-form.comp'
import Alert from '../ui/alert'
import ContainerComponent from 'components/layout/container.comp'

const AuthFormContainer = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
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
      console.log(result.error)
    }
  }

  return (
    <Fragment>
      <ContainerComponent>
        <AuthFormComponent
          onSubmit={handleLoginSubmit}
          usernameRef={userNameRef}
          passwordRef={passwordRef}
          loading={loading}
        />
        {authFailed && <Alert message={errorMessage} />}
      </ContainerComponent>
    </Fragment>
  )
}

export default AuthFormContainer
