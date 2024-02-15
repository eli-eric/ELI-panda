import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { createContext } from 'react'

import EliLogoComponent from '@/components/eli-logo.comp'
import { ENV, PROCESS_ENV } from '@/types/constants/common'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { EnvInfo } from './components/EnvInfo'
import { MenuItemsList } from './components/MenuItemsList'
import { MobileMenuButton } from './components/MobileMenuButton'
import { UserMenu } from './components/UserMenu'

export const DisclosureNavBarContext = createContext<{ open: boolean }>({ open: false })

export const NavigationBar = () => {
  const { status } = useSession()

  return (
    <Disclosure
      id="nav-bar"
      as="nav"
      className={classNames(
        'border-b bg-white dark:bg-gray-800',
        PROCESS_ENV && PROCESS_ENV === ENV.DEV && 'bg-teal-100 dark:bg-teal-900',
        PROCESS_ENV && PROCESS_ENV === ENV.TEST && 'bg-pink-50 dark:bg-pink-900'
      )}
    >
      {({ open }) => (
        <DisclosureNavBarContext.Provider value={{ open }}>
          <EnvInfo />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <MobileMenuButton open={open} />
              <div className="flex flex-row flex-shrink-0 items-center">
                <Link href={status === 'authenticated' ? PATH.DASHBOARD : PATH.ROOT}>
                  <EliLogoComponent customClass="block h-10 w-auto" />
                </Link>
              </div>
              <MenuItemsList open={false} />
              {status === 'authenticated' && <UserMenu />}
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden flex-1">
            <MenuItemsList open={open} />
          </Disclosure.Panel>
        </DisclosureNavBarContext.Provider>
      )}
    </Disclosure>
  )
}
