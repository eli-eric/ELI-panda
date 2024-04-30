import { Bars3Icon, PowerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { type FC } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import EliLogoComponent from '@/components/eli-logo.comp'
import { NAV_BAR_CONFIG, PATH, USER_NAVIGATION } from '@/types/constants/paths'
import { classNames } from '@/utils'

import {
  NavBarButton,
  NavBarLink,
  NavBarMultiLink,
  SupportLink
} from './NavBarItems'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

interface NavBarHeaderProps {
  isExpanded: boolean
  onCollapse: () => void
}
export const NavBarHeader: FC<NavBarHeaderProps> = ({
  isExpanded,
  onCollapse
}) => {
  return (
    <div className="flex justify-between w-full">
      <button onClick={onCollapse} className="pt-2 pb-10 pl-2">
        {isExpanded ? (
          <XMarkIcon className="h-10 w-10 p-2 text-gray-600 dark:text-gray-200 rounded-full hover:bg-gray-300 hover:dark:bg-gray-600" />
        ) : (
          <Bars3Icon className="h-10 w-10 p-2 text-gray-600 dark:text-gray-200 rounded-full hover:bg-gray-300 hover:dark:bg-gray-600" />
        )}
      </button>
      <Link href={PATH.DASHBOARD}>
        <EliLogoComponent
          customClass={classNames('h-10 w-12 pt-4', !isExpanded && 'hidden')}
        />
      </Link>
      <DarkModeSwitch
        className={classNames(!isExpanded && 'hidden', 'mt-4 mr-2')}
      />
    </div>
  )
}

interface MainNavigationProps {
  isExpanded: boolean
  toggleItemExpansion: (itemName: string) => void
  expandedItems: Record<string, boolean>
  setOpen?: (open: boolean) => void
}

export const MainNavigation: FC<MainNavigationProps> = ({
  setOpen,
  isExpanded,
  expandedItems,
  toggleItemExpansion
}) => {
  const pathName = usePathname()

  const { data: codebooks } = useQuery<{ code: string; type: string }[]>({
    queryKey: ['codebooks'],
    queryFn: queryFetcher('codebooks')
  })

  return (
    <div className="flex-grow">
      {NAV_BAR_CONFIG.map(item => {
        if (item.name === 'Codebooks' && codebooks?.length === 0) {
          return null
        }
        if (item.links) {
          return (
            <NavBarMultiLink
              key={item.name}
              setOpen={setOpen}
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
              setOpen={setOpen}
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
  setOpen?: (open: boolean) => void
}

export const UserSection: FC<UserSectionProps> = ({ setOpen, isExpanded }) => {
  const pathName = usePathname()
  const signOutHandler = () => {
    setOpen && setOpen(false)
    signOut({ callbackUrl: PATH.ROOT })
  }
  return (
    <div>
      <SupportLink isExpanded={isExpanded} />
      {USER_NAVIGATION.map(item => (
        <NavBarLink
          key={item.name}
          setOpen={setOpen}
          role={item.role}
          href={item.link}
          isActive={pathName.startsWith(item.link || '')}
          isExpanded={isExpanded}
          Icon={item.Icon}
          text={item.name}
        />
      ))}
      <NavBarButton
        onClick={signOutHandler}
        isExpanded={isExpanded}
        Icon={PowerIcon}
        text={'Sign out'}
      />
    </div>
  )
}
