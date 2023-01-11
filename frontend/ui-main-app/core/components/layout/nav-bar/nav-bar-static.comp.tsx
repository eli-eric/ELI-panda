import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import EliLogoComponent from 'core/components/ui/eli-logo.comp'

import PropfileDropdownComponent from '../profile/dropdown/profile-dropdown.comp'
import NavigationListContainer from './navigation/navigation-list.cont'

interface Props {
  open: boolean
}

const NavBarStaticComponent = ({ open }: Props) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center">
            <EliLogoComponent customClass="block h-10 w-auto" />
          </div>
          <NavigationListContainer open={false} />
        </div>
        <PropfileDropdownComponent open={false} />
        <div className="-mr-2 flex items-center sm:hidden">
          {/* Mobile menu button */}
          <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </Disclosure.Button>
        </div>
      </div>
    </div>
  )
}

export default NavBarStaticComponent
