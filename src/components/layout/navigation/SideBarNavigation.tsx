import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  PowerIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import { NAV_BAR_CONFIG, PATH, SUPPORT } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { NavBarButton, NavBarItem, NavBarLink } from './NavBarItems'

export const SidebarNavigation = () => {
  const session = useSession()
  const { status } = session
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  const signOutHandler = () => {
    signOut({ callbackUrl: PATH.ROOT })
  }
  const pathName = usePathname()

  const toggleItemExpansion = itemName => {
    setIsExpanded(true) // Also expand the sidebar when a multi-link item is clicked
    setExpandedItems(prevExpandedItems => ({
      ...prevExpandedItems,
      [itemName]: !prevExpandedItems[itemName]
    }))
  }

  // Additional items for the bottom of the sidebar
  const additionalItems = [
    { name: 'Profile', link: PATH.PROFILE_GENERAL, Icon: UserIcon },
    { name: 'Administration', link: PATH.ADMIN_USERS, Icon: UserGroupIcon }
  ]

  if (status === 'unauthenticated') return null

  return (
    <div
      className={classNames(
        `flex flex-col justify-between`,
        isExpanded ? 'w-64' : 'w-14',
        `h-full min-h-screen sticky left-0 top-0 bottom-0 truesition-all duration-300 ease-in-out bg-gray-800 border-r border-gray-900 dark:bg-gray-900 dark:border-gray-200 pb-4`
      )}
    >
      <div className="flex justify-between">
        <button
          onClick={() => {
            setIsExpanded(!isExpanded)
            setExpandedItems(prevExpandedItems => {
              const newExpanded = Object.keys(prevExpandedItems).map(item => {
                return { [item]: false }
              })
              return Object.assign({}, ...newExpanded)
            })
          }}
          className="pt-2 pb-10 pl-2"
        >
          {isExpanded ? (
            <XMarkIcon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
          ) : (
            <Bars3Icon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
          )}
        </button>
        <DarkModeSwitch className={classNames(!isExpanded && 'hidden', 'mt-4 mr-2')} />
      </div>

      <div className="flex-grow">
        {NAV_BAR_CONFIG.map(item => {
          if (item.links) {
            return (
              <div key={item.name} className="flex flex-col">
                <NavBarButton onClick={() => toggleItemExpansion(item.name)}>
                  <NavBarItem
                    isExpanded={isExpanded}
                    Icon={item.Icon}
                    text={item.name}
                    isActive={item.links.some(subItem => pathName.startsWith(subItem.path))}
                  />
                  <div
                    className={classNames('transition-opacity duration-300', isExpanded ? 'opacity-100' : 'opacity-0')}
                  >
                    {expandedItems[item.name] ? (
                      <ChevronDownIcon className="ml-auto h-5 w-5 text-gray-200" />
                    ) : (
                      <ChevronRightIcon className="ml-auto h-5 w-5 text-gray-200" />
                    )}
                  </div>
                </NavBarButton>
                {expandedItems[item.name] && (
                  <div className="pl-10">
                    {item.links.map(subItem => (
                      <NavBarLink key={subItem.name} href={subItem.path}>
                        <NavBarItem
                          isExpanded={isExpanded}
                          text={subItem.name}
                          isActive={pathName.startsWith(subItem.path)}
                        />
                      </NavBarLink>
                    ))}
                  </div>
                )}
              </div>
            )
          } else {
            return (
              <NavBarLink key={item.name} href={item.link}>
                <NavBarItem
                  isExpanded={isExpanded}
                  Icon={item.Icon}
                  text={item.name}
                  isActive={pathName.startsWith(item.link || '')}
                />
              </NavBarLink>
            )
          }
        })}
      </div>

      <div>
        <Link href={SUPPORT} legacyBehavior>
          <a target={'_blank'} rel="noreferrer" className="flex items-center p-4 hover:bg-gray-700">
            <div>
              <span className={classNames('h-6 w-6 ml-1 text-2xl text-white')}>?</span>
            </div>
            <span
              className={classNames(
                `ml-5`,
                isExpanded ? 'opacity-100' : 'opacity-0',
                `transition-opacity duration-200 whitespace-nowrap text-gray-200`
              )}
            >
              {'Support'}
            </span>
          </a>
        </Link>
        {additionalItems.map(item => (
          <NavBarLink key={item.name} href={item.link}>
            <NavBarItem
              key={item.name}
              isActive={pathName.startsWith(item.link || '')}
              isExpanded={isExpanded}
              Icon={item.Icon}
              text={item.name}
            />
          </NavBarLink>
        ))}
        <NavBarButton onClick={signOutHandler}>
          <NavBarItem isExpanded={isExpanded} Icon={PowerIcon} text={'Sign out'} />
        </NavBarButton>
      </div>
    </div>
  )
}
