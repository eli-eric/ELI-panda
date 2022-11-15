import AuthFormContainer from 'components/auth/auth-form.container'
import { useAuth } from 'helpers/hooks/useAuth'
import { redirect } from 'next/dist/server/api-utils'

const AuthPage = () => {
  const auth = useAuth()

  return <AuthFormContainer />
}

export default AuthPage
