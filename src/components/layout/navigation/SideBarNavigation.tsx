import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { classNames } from '@/utils'

import { MainNavigation, NavBarHeader, UserSection } from './NavBarSections'

export const SidebarNavigation = () => {
  const session = useSession()
  const { status } = session
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})

  // toggleItemExpansion for expand multiple links naviagtion
  const toggleItemExpansion = itemName => {
    setIsExpanded(true)
    setExpandedItems(prevExpandedItems => ({
      ...prevExpandedItems,
      [itemName]: !prevExpandedItems[itemName]
    }))
  }
  const onCollapse = () => {
    setIsExpanded(!isExpanded)
    setExpandedItems(prevExpandedItems => {
      const newExpanded = Object.keys(prevExpandedItems).map(item => {
        return { [item]: false }
      })
      return Object.assign({}, ...newExpanded)
    })
  }

  if (status === 'unauthenticated') return null

  return (
    <div
      className={classNames(
        `flex flex-col justify-between`,
        isExpanded ? 'w-64' : 'w-14',
        `h-full min-h-screen sticky left-0 top-0 bottom-0 truesition-all duration-300 ease-in-out bg-gray-800 border-r border-gray-900 dark:bg-gray-900 dark:border-gray-200 pb-4`
      )}
    >
      <NavBarHeader isExpanded={isExpanded} onCollapse={onCollapse} />
      <MainNavigation isExpanded={isExpanded} toggleItemExpansion={toggleItemExpansion} expandedItems={expandedItems} />
      <UserSection isExpanded={isExpanded} />
    </div>
  )
}
