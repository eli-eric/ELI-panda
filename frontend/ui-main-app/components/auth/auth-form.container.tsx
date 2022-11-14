import { FormEvent, useRef } from 'react'
import AuthFormComponent from './auth-form.component'

const AuthFormContainer = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('submited sign in', usernameRef.current?.value, passwordRef.current?.value)
    //TODO: login
  }

  return <AuthFormComponent onSubmit={handleLoginSubmit} usernameRef={usernameRef} passwordRef={passwordRef} />
}

export default AuthFormContainer
