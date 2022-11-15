import { ChartBarIcon, FolderIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'
import { useAuth } from 'helpers/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { PATHS } from 'types/constants/paths'
import { ROLES } from 'types/constants/roles'
import NavigationLink from './navigationLink.comp'

const NavigationComponent = () => {
  const { status, userRoles } = useAuth()
  return (
    <Fragment>
      <div className="flex flex-shrink-0 items-center px-4">
        <Image
          className="h-8 w-auto"
          src="/../public/eli-logo-small.png"
          alt="Your Company"
          width={200}
          height={200}
          priority={true}
        />
      </div>
      <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
        {status === 'authenticated' ? (
          <Fragment>
            <NavigationLink name={'Dashboard'} href={PATHS.DASHBOARD} Icon={HomeIcon} />
            {userRoles?.includes(ROLES.CATALOGUE_VIEW) && (
              <NavigationLink name={'Catalogue'} href={PATHS.CATALOGUE} Icon={FolderIcon} />
            )}
            {userRoles?.includes(ROLES.SYSTEMS_VIEW) && (
              <NavigationLink name={'Systems'} href={PATHS.SYSTEMS} Icon={InboxIcon} />
            )}
            {userRoles?.includes(ROLES.REPORTS_VIEW) && (
              <NavigationLink name={'Reports'} href={PATHS.REPORTS} Icon={ChartBarIcon} />
            )}
          </Fragment>
        ) : (
          <NavigationLink name={'Log In'} href={PATHS.AUTH} Icon={HomeIcon} />
        )}
      </nav>
    </Fragment>
  )
}

export default NavigationComponent
