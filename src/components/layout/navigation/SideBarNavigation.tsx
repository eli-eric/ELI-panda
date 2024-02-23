import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  PowerIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import { NAV_BAR_CONFIG, PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

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
  const additionalItems = [{ name: 'Profile', link: PATH.PROFILE_GENERAL, Icon: UserIcon }]

  if (status === 'unauthenticated') return null

  return (
    <div
      className={`flex flex-col justify-between ${
        isExpanded ? 'w-64' : 'w-14'
      } h-full min-h-screen sticky left-0 top-0 bottom-0 truesition-all duration-300 ease-in-out bg-gray-800 border-r border-gray-900 dark:bg-gray-900 dark:border-gray-200 pb-4`}
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
              <div key={item.name} onClick={() => toggleItemExpansion(item.name)} className="flex flex-col">
                <div className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                  <div>
                    <item.Icon
                      className={classNames(
                        'h-6 w-6 text-white',
                        item.links.some(link => link.path === pathName) && 'text-primary-600'
                      )}
                    />
                  </div>
                  <span
                    className={`ml-4 ${
                      isExpanded ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-200 whitespace-nowrap text-gray-200`}
                  >
                    {item.name}
                  </span>
                  {expandedItems[item.name] ? (
                    <ChevronDownIcon className="ml-auto h-5 w-5 text-gray-200" />
                  ) : (
                    <ChevronRightIcon className="ml-auto h-5 w-5 text-gray-200" />
                  )}
                </div>
                {expandedItems[item.name] &&
                  item.links.map(subItem => (
                    <Link key={subItem.name} href={subItem.path}>
                      <div className="pl-12 p-4 hover:bg-gray-700 block text-gray-200">{subItem.name}</div>
                    </Link>
                  ))}
              </div>
            )
          } else {
            return (
              <Link key={item.name} href={item.link || '#'} className="flex items-center p-4 hover:bg-gray-700">
                <div>
                  <item.Icon className="h-6 w-6 text-gray-200" />
                </div>
                <span
                  className={`ml-4 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-200 whitespace-nowrap text-gray-200`}
                >
                  {item.name}
                </span>
              </Link>
            )
          }
        })}
      </div>

      <div>
        {additionalItems.map(item => (
          <Link key={item.name} href={item.link} className="flex items-center p-4 hover:bg-gray-700">
            <div>
              <item.Icon className="h-6 w-6 text-white" />
            </div>
            <span
              className={`ml-4 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-200 whitespace-nowrap text-gray-200`}
            >
              {item.name}
            </span>
          </Link>
        ))}
        <div className=" p-4 hover:bg-gray-700">
          <button className="flex items-center " onClick={signOutHandler}>
            <div>
              <PowerIcon className="h-6 w-6 text-white" />
            </div>
            <span
              className={`ml-4 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-200 whitespace-nowrap text-gray-200`}
            >
              Sign out
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
