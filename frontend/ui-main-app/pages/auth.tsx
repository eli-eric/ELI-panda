import AuthFormContainer from 'components/auth/auth-form.container'
import { useAuthRedirect } from 'helpers/hooks/useAuth'
import { redirect } from 'next/dist/server/api-utils'

const AuthPage = () => {
  const auth = useAuthRedirect()

  return <AuthFormContainer />
}

export default AuthPage
