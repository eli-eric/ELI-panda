import { Disclosure } from '@headlessui/react'

import PropfileDropdownComponent from '../profile/dropdown/profile-dropdown.comp'
import NavigationListContainer from './navigation/navigation-list.cont'

interface Props {
  open: boolean
}

const NavBarHideoutComponent = ({ open }: Props) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <NavigationListContainer open={open} />
      <PropfileDropdownComponent open={open} />
    </Disclosure.Panel>
  )
}

export default NavBarHideoutComponent
