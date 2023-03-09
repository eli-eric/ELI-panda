import { Disclosure } from '@headlessui/react'
import { Fragment } from 'react'

import NavBarHideoutComponent from './nav-bar-hideout.comp'
import NavBarStaticComponent from './nav-bar-static.comp'

export default function NavigationComponent() {
  const getBackgroundByPandaEnv = (): string => {
    const env = process.env.PANDA_ENV
    let result = 'bg-white'
    if (env) {
      if (env === 'dev') {
        result = 'bg-purple-200'
      } else if (env === 'test') {
        result = 'bg-green-200'
      }
    }
    return result
  }

  return (
    <Disclosure id="nav-bar" as="nav" className={getBackgroundByPandaEnv() + ' border-b'}>
      {({ open }) => (
        <Fragment>
          <NavBarStaticComponent open={open} />
          <NavBarHideoutComponent open={open} />
        </Fragment>
      )}
    </Disclosure>
  )
}
