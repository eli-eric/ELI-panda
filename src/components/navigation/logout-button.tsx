import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

import { DropdownMenuItem } from '../ui/dropdown-menu'

export const LogoutButton = () => {
  const router = useRouter()
  const { formatMessage: fm } = useIntl()
  const handleLogout = async () => {
    signOut({ redirect: false }).finally(() => {
      router.push(PATH.ROOT)
    })
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      {fm({ id: message.common.buttons.logOut })}
    </DropdownMenuItem>
  )
}
