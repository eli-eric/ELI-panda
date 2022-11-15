import { useAuthRedirect } from 'helpers/hooks/useAuth'

const HomePage = () => {
  useAuthRedirect()
}

export default HomePage
