import { Disclosure } from '@headlessui/react'

import NavigationListContainer from './navigation/navigation-list.cont'
import ProfileDropdownComponent from './profile/dropdown/profile-dropdown.comp'

interface Props {
  open: boolean
}

const NavBarHideoutComponent = ({ open }: Props) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <NavigationListContainer open={open} />
      <ProfileDropdownComponent open={open} />
    </Disclosure.Panel>
  )
}

export default NavBarHideoutComponent
