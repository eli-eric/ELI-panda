import { Disclosure } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

import TooltipComponent from '@/components/tooltip.comp'
import { ENV, PROCESS_ENV } from '@/types/constants/common'

import NavBarHideoutComponent from './nav-bar-hideout.comp'
import NavBarStaticComponent from './nav-bar-static.comp'

export default function NavigationComponent() {
  const getBackgroundByPandaEnv = (): string => {
    let result = 'bg-white'
    if (PROCESS_ENV) {
      if (PROCESS_ENV === ENV.DEV) {
        result = 'bg-teal-100'
      } else if (PROCESS_ENV === ENV.TEST) {
        result = 'bg-pink-50'
      }
    }
    return result
  }

  const EnvInfoTest = () => (
    <div className="flex flex-col justify-center items-center text-lg absolute left-2 top-2 font-mono">
      <span>TEST</span>
      <TooltipComponent
        offset={{ left: 10, top: -100 }}
        text="You are in the TEST environment. This version is identical to the production version, but it uses a test database. Data are not persistent because of the override from the production database. (mostly on daily basis)"
      >
        <InformationCircleIcon className="h-8 w-8 flex-shrink-0 -mt-2" />
      </TooltipComponent>{' '}
    </div>
  )

  const EnvInfoDev = () => (
    <div className="flex flex-col justify-center items-center text-lg absolute left-2 top-2 font-mono">
      <span>DEV</span>
      <TooltipComponent
        offset={{ left: 10, top: -100 }}
        text="You are in the DEV environment. This version is based on the dev branch in git. It uses a dev database. Data are not persistent."
      >
        <InformationCircleIcon className="h-8 w-8 flex-shrink-0 -mt-2" />
      </TooltipComponent>{' '}
    </div>
  )

  return (
    <Disclosure id="nav-bar" as="nav" className={getBackgroundByPandaEnv() + ' border-b'}>
      {({ open }) => (
        <Fragment>
          {PROCESS_ENV && PROCESS_ENV === ENV.TEST && <EnvInfoTest />}
          {PROCESS_ENV && PROCESS_ENV === ENV.DEV && <EnvInfoDev />}
          <NavBarStaticComponent open={open} />
          <NavBarHideoutComponent open={open} />
        </Fragment>
      )}
    </Disclosure>
  )
}
