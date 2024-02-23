import { Bars3Icon, PowerIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import { NAV_BAR_CONFIG, PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

export const SidebarNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItemExpansion = itemName => {
    setExpandedItems(prevExpandedItems => ({
      ...prevExpandedItems,
      [itemName]: !prevExpandedItems[itemName]
    }))
  }

  // Additional items for the bottom of the sidebar
  const additionalItems = [
    { name: 'Profile', link: PATH.PROFILE_GENERAL, Icon: UserIcon }, // Assume SettingsIcon is imported
    { name: 'Logout', link: '/logout', Icon: PowerIcon } // Assume LogoutIcon is imported
  ]

  return (
    <div
      className={`flex flex-col justify-between ${
        isExpanded ? 'w-64' : 'w-16'
      } h-full min-h-screen sticky left-0 top-0 bottom-0 transition-all duration-300 ease-in-out bg-gray-800 border-r border-gray-900 dark:bg-gray-900 dark:border-gray-200 pb-4`}
    >
      <div className="flex justify-between">
        <button onClick={() => setIsExpanded(!isExpanded)} className="pt-2 pb-2 pl-2">
          {isExpanded ? (
            <XMarkIcon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
          ) : (
            <Bars3Icon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
          )}
        </button>
        <DarkModeSwitch className={classNames(!isExpanded && 'hidden', 'mt-4 mr-2')} />
      </div>

      <div className="flex-grow">
        {NAV_BAR_CONFIG.map(item => (
          <Link
            key={item.name}
            href={item.link || '#'}
            className="hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-500"
          >
            <div className={`flex items-center p-4 `}>
              <div>
                <item.Icon className="h-6 w-6" />
              </div>
              <span
                className={`ml-4 transition-opacity duration-200 ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                } whitespace-nowrap`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div>
        {additionalItems.map(item => (
          <Link
            key={item.name}
            href={item.link}
            className="hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-500"
          >
            <div className="flex items-center p-4">
              <div>
                <item.Icon className="h-6 w-6" />
              </div>
              <span
                className={`ml-4 transition-opacity duration-200 ${
                  isExpanded ? 'opacity-100' : 'opacity-0'
                } whitespace-nowrap`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
