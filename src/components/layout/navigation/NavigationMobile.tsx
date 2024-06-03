import { Bars3Icon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import EliLogoComponent from '@/components/eli-logo.comp'
import { SlideOverNavigation } from '@/components/overlays/slideover/SlideOverNavigation'
import { ENV, PROCESS_ENV } from '@/types/constants/common'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { MainNavigation, UserSection } from './NavBarSections'

export const NavigationMobile = () => {
  const session = useSession()
  const status = session.status
  const [openNav, setOpenNav] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})

  // toggleItemExpansion for expand multiple links naviagtion
  const toggleItemExpansion = itemName => {
    setExpandedItems(prevExpandedItems => ({
      ...prevExpandedItems,
      [itemName]: !prevExpandedItems[itemName]
    }))
  }

  if (status === 'unauthenticated' || status === 'loading') return null
  return (
    <header className="sticky top-0 z-20">
      <div
        id="nav-bar"
        className={classNames(
          'lg:hidden flex w-full justify-between text-center items-center dark:bg-gray-800 bg-slate-100',
          PROCESS_ENV &&
            PROCESS_ENV === ENV.DEV &&
            'bg-teal-600 dark:bg-teal-900',
          PROCESS_ENV &&
            PROCESS_ENV === ENV.TEST &&
            'bg-pink-600 dark:bg-pink-900'
        )}
      >
        <button onClick={() => setOpenSettings(!openSettings)} className="pl-2">
          <Cog6ToothIcon className="h-10 w-10 p-2 text-gray-600 dark:text-gray-200 rounded-full hover:bg-gray-300 hover:dark:bg-gray-600" />
        </button>
        <Link href={PATH.DASHBOARD}>
          <EliLogoComponent customClass={classNames('h-6 w-12')} />
        </Link>
        <button onClick={() => setOpenNav(!openNav)} className="pl-2">
          <Bars3Icon className="h-10 w-10 p-2 text-gray-600 dark:text-gray-200 rounded-full hover:bg-gray-300 hover:dark:bg-gray-600" />
        </button>
      </div>
      <SlideOverNavigation
        panelSlide="right"
        open={openNav}
        setOpen={setOpenNav}
      >
        <MainNavigation
          isExpanded={true}
          toggleItemExpansion={toggleItemExpansion}
          setOpen={setOpenNav}
          expandedItems={expandedItems}
        />
      </SlideOverNavigation>
      <SlideOverNavigation
        panelSlide="left"
        open={openSettings}
        setOpen={setOpenSettings}
      >
        <UserSection isExpanded={true} setOpen={setOpenSettings} />
      </SlideOverNavigation>
    </header>
  )
}
