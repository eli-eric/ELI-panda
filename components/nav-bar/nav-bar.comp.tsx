import { Disclosure } from '@headlessui/react'
import { Fragment } from 'react'

import NavBarHideoutComponent from './nav-bar-hideout.comp'
import NavBarStaticComponent from './nav-bar-static.comp'

export default function NavigationComponent() {
  return (
    <Disclosure id="nav-bar" as="nav" className="bg-white border-b">
      {({ open }) => (
        <Fragment>
          <NavBarStaticComponent open={open} />
          <NavBarHideoutComponent open={open} />
        </Fragment>
      )}
    </Disclosure>
  )
}
