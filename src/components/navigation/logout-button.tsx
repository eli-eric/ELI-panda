import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { PATH } from '@/types/constants/paths'

import { DropdownMenuItem } from '../ui/dropdown-menu'

export const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    signOut({ redirect: false }).finally(() => {
      router.push(PATH.ROOT)
    })
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  )
}
