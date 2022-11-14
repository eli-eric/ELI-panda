import { FormEvent, useRef } from 'react'
import { signIn } from 'next-auth/react'

import AuthFormComponent from './auth-form.component'

const AuthFormContainer = () => {
  const userNameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const enteredUserName = userNameRef.current?.value
    const enteredPassword = passwordRef.current?.value
    console.log('submited sign in', enteredUserName, enteredPassword)
    const result = await signIn('credentials', {
      redirect: false,
      userName: enteredUserName,
      password: enteredPassword
    })
    if (!result?.error) {
      // set some auth state
    }

    //TODO: login
  }

  return <AuthFormComponent onSubmit={handleLoginSubmit} usernameRef={userNameRef} passwordRef={passwordRef} />
}

export default AuthFormContainer
