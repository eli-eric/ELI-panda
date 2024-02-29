import { Bars3Icon, PowerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { type FC } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import EliLogoComponent from '@/components/eli-logo.comp'
import { NAV_BAR_CONFIG, PATH, USER_NAVIGATION } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { NavBarButton, NavBarLink, NavBarMultiLink, SupportLink } from './NavBarItems'

interface NavBarHeaderProps {
  isExpanded: boolean
  onCollapse: () => void
}
export const NavBarHeader: FC<NavBarHeaderProps> = ({ isExpanded, onCollapse }) => {
  return (
    <div className="flex justify-between w-full">
      <button onClick={onCollapse} className="pt-2 pb-10 pl-2">
        {isExpanded ? (
          <XMarkIcon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
        ) : (
          <Bars3Icon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
        )}
      </button>
      <EliLogoComponent customClass={classNames('h-10 w-12 pt-4', !isExpanded && 'hidden')} />
      <DarkModeSwitch className={classNames(!isExpanded && 'hidden', 'mt-4 mr-2')} />
    </div>
  )
}

interface MainNavigationProps {
  isExpanded: boolean
  toggleItemExpansion: (itemName: string) => void
  expandedItems: Record<string, boolean>
}

export const MainNavigation: FC<MainNavigationProps> = ({ isExpanded, expandedItems, toggleItemExpansion }) => {
  const pathName = usePathname()
  return (
    <div className="flex-grow">
      {NAV_BAR_CONFIG.map(item => {
        if (item.links) {
          return (
            <NavBarMultiLink
              key={item.name}
              item={item}
              role={item.role}
              isExpanded={isExpanded}
              toggleItemExpansion={toggleItemExpansion}
              expandedItems={expandedItems}
            />
          )
        } else {
          return (
            <NavBarLink
              key={item.name}
              role={item.role}
              href={item.link}
              isExpanded={isExpanded}
              Icon={item.Icon}
              text={item.name}
              isActive={pathName.startsWith(item.link || '')}
            />
          )
        }
      })}
    </div>
  )
}

interface UserSectionProps {
  isExpanded: boolean
}

export const UserSection: FC<UserSectionProps> = ({ isExpanded }) => {
  const pathName = usePathname()
  const signOutHandler = () => {
    signOut({ callbackUrl: PATH.ROOT })
  }
  return (
    <div>
      <SupportLink isExpanded={isExpanded} />
      {USER_NAVIGATION.map(item => (
        <NavBarLink
          key={item.name}
          role={item.role}
          href={item.link}
          isActive={pathName.startsWith(item.link || '')}
          isExpanded={isExpanded}
          Icon={item.Icon}
          text={item.name}
        />
      ))}
      <NavBarButton onClick={signOutHandler} isExpanded={isExpanded} Icon={PowerIcon} text={'Sign out'} />
    </div>
  )
}
