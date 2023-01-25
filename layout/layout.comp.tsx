import { Disclosure } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

import NavBarHideoutComponent from './nav-bar/nav-bar-hideout.comp'
import NavBarStaticComponent from './nav-bar/nav-bar-static.comp'

interface Props {
  children: React.ReactNode
}
export default function LayoutComponent({ children }: Props) {
  const { status } = useSession()
  return (
    <Fragment>
      {status === 'authenticated' && (
        <Disclosure id="nav-bar" as="nav" className="bg-white border-b">
          {({ open }) => (
            <Fragment>
              <NavBarStaticComponent open={open} />
              <NavBarHideoutComponent open={open} />
            </Fragment>
          )}
        </Disclosure>
      )}
      <>{children}</>
    </Fragment>
  )
}
