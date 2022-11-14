import { FormEvent, useRef } from 'react'
import { signIn } from 'next-auth/react'
import Router from 'next/router'
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
      username: enteredUserName,
      password: enteredPassword
    })
    console.log(result)
    if (!result?.error) {
      // set some auth state
      Router.replace('/dashboard')
    }

    //TODO: login
  }

  return <AuthFormComponent onSubmit={handleLoginSubmit} usernameRef={userNameRef} passwordRef={passwordRef} />
}

export default AuthFormContainer
