import { ChartBarIcon, FolderIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'
import { useAuth } from 'helpers/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { PATHS } from 'types/paths'

const navigation = [
  { name: 'Dashboard', href: PATHS.DASHBOARD, icon: HomeIcon },
  { name: 'Catalogue', href: PATHS.CATALOGUE, icon: FolderIcon },
  { name: 'Systems', href: PATHS.SYSTEMS, icon: InboxIcon },
  { name: 'Reports', href: PATHS.REPORTS, icon: ChartBarIcon }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const NavigationComponent = () => {
  const { status } = useAuth()
  const router = useRouter()
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
          navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.href === router.pathname
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
            >
              <item.icon
                className={classNames(
                  item.href === router.pathname ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))
        ) : (
          <Link
            key={'Log In'}
            href={'/auth'}
            className={'bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md'}
          >
            <HomeIcon className={'text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} aria-hidden="true" />
            Log In
          </Link>
        )}
      </nav>
    </Fragment>
  )
}

export default NavigationComponent
