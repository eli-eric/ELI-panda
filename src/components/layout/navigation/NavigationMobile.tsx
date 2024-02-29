import { Bars3Icon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import EliLogoComponent from '@/components/eli-logo.comp'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import { classNames } from '@/utils'

import { MainNavigation } from './NavBarSections'

export const NavigationMobile = () => {
  const [open, setOpen] = useState(false)
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
    <Fragment>
      <div
        id="nav-bar"
        className={'lg:hidden flex w-full justify-between text-center items-center dark:bg-gray-800 bg-slate-500'}
      >
        <button onClick={() => setOpen(!open)} className="pl-2">
          <Bars3Icon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
        </button>
        <EliLogoComponent customClass={classNames('h-6 w-12')} />
        <DarkModeSwitch className={classNames('mr-2')} />
      </div>
      <SlideOver open={open} setOpen={setOpen}>
        <MainNavigation isExpanded={true} toggleItemExpansion={toggleItemExpansion} expandedItems={expandedItems} />
      </SlideOver>
    </Fragment>
  )
}
