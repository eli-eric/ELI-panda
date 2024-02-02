'use-client'
import { Disclosure } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { ENV, PROCESS_ENV } from '@/types/constants/common'
import { classNames } from '@/utils'

import NavBarHideoutComponent from './nav-bar-hideout.comp'
import NavBarStaticComponent from './nav-bar-static.comp'

export const NavigationComponent = () => {
  const infoText =
    PROCESS_ENV && PROCESS_ENV === ENV.TEST
      ? 'You are in the TEST environment. This version is identical to the production version, but it uses a test database. Data are not persistent because of the override from the production database. (mostly on daily basis)'
      : PROCESS_ENV && PROCESS_ENV === ENV.DEV
        ? 'You are in the DEV environment. This version is based on the dev branch in git. It uses a dev database. Data are not persistent.'
        : undefined

  const EnvInfo = ({ infoText, env }: { infoText: string; env?: string }) => (
    <div className="flex flex-col justify-center items-center text-lg absolute left-2 top-2 font-mono">
      <span>{env?.toUpperCase()}</span>
      <Tooltip content={infoText}>
        <InformationCircleIcon className="h-8 w-8 flex-shrink-0 -mt-2" />
      </Tooltip>
    </div>
  )

  return (
    <Disclosure
      id="nav-bar"
      as="nav"
      className={classNames(
        'border-b bg-white dark:bg-gray-800',
        PROCESS_ENV && PROCESS_ENV === ENV.DEV && 'bg-teal-100',
        PROCESS_ENV && PROCESS_ENV === ENV.TEST && 'bg-pink-50'
      )}
    >
      {({ open }) => (
        <Fragment>
          {infoText && <EnvInfo infoText={infoText} env={PROCESS_ENV} />}
          <NavBarStaticComponent open={open} />
          <NavBarHideoutComponent open={open} />
        </Fragment>
      )}
    </Disclosure>
  )
}
