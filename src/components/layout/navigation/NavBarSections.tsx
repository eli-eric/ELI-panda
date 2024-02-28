import { Bars3Icon, PowerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { type FC, Fragment } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import { NAV_BAR_CONFIG, PATH, USER_NAVIGATION } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { ChevronIcon, NavBarButton, NavBarLink, SupportLink } from './NavBarItems'

interface NavBarHeaderProps {
  isExpanded: boolean
  onCollapse: () => void
}
export const NavBarHeader: FC<NavBarHeaderProps> = ({ isExpanded, onCollapse }) => {
  return (
    <div className="flex justify-between">
      <button onClick={onCollapse} className="pt-2 pb-10 pl-2">
        {isExpanded ? (
          <XMarkIcon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
        ) : (
          <Bars3Icon className="h-10 w-10 p-2 text-white rounded-full hover:bg-gray-600" />
        )}
      </button>
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
            <div key={item.name} className="flex flex-col ">
              <NavBarButton
                isExpanded={isExpanded}
                onClick={() => toggleItemExpansion(item.name)}
                Icon={item.Icon}
                text={item.name}
                isActive={item.links.some(subItem => pathName.startsWith(subItem.path))}
              >
                <ChevronIcon isExpanded={isExpanded} open={expandedItems[item.name]} />
              </NavBarButton>
              {expandedItems[item.name] && (
                <Fragment>
                  {item.links.map(subItem => (
                    <NavBarLink
                      className="text-xs pl-10"
                      role={subItem.role}
                      key={subItem.name}
                      href={subItem.path}
                      isExpanded={isExpanded}
                      text={subItem.name}
                      isActive={pathName.startsWith(subItem.path)}
                    />
                  ))}
                </Fragment>
              )}
            </div>
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
