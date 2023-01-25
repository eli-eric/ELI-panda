import { Disclosure } from '@headlessui/react'
import { useSession } from 'next-auth/react'

import NavigationListContainer from './navigation/navigation-list.cont'
import ProfileDropdownComponent from './profile/dropdown/profile-dropdown.comp'

interface Props {
  open: boolean
}

const NavBarHideoutComponent = ({ open }: Props) => {
  const { status } = useSession()
  return (
    <Disclosure.Panel className="sm:hidden">
      <NavigationListContainer open={open} />
      {status === 'authenticated' && <ProfileDropdownComponent open={open} />}
    </Disclosure.Panel>
  )
}

export default NavBarHideoutComponent
