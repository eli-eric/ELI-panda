import { Bars3Icon, PowerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { type FC } from 'react'

import { AccessControl } from '@/components/auth/AccesControl'
import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import EliLogoComponent from '@/components/eli-logo.comp'
import { cn } from '@/lib/utils'
import { NAV_BAR_CONFIG, PATH, USER_NAVIGATION } from '@/types/constants/paths'
import { queryFetcher } from '@/utils/fetcher'

import {
  NavBarButton,
  NavBarLink,
  NavBarMultiLink,
  SupportLink
} from './NavBarItems'

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
          customClass={cn('h-10 w-12 pt-4', !isExpanded && 'hidden')}
        />
      </Link>
      <DarkModeSwitch className={cn(!isExpanded && 'hidden', 'mt-4 mr-2')} />
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

  const { data: codebooks } = useQuery({
    queryKey: ['codebooks'],
    queryFn: queryFetcher<{ code: string; type: string }[]>('codebooks')
  })

  return (
    <div className="flex-grow">
      {NAV_BAR_CONFIG.map(item => {
        if (item.name === 'Codebooks' && codebooks?.length === 0) {
          return null
        }
        if (item.links) {
          return (
            <AccessControl roles={item.role} key={item.name}>
              <NavBarMultiLink
                setOpen={setOpen}
                item={item}
                isExpanded={isExpanded}
                toggleItemExpansion={toggleItemExpansion}
                expandedItems={expandedItems}
              />
            </AccessControl>
          )
        } else {
          return (
            <AccessControl roles={item.role} key={item.name}>
              <NavBarLink
                key={item.name}
                setOpen={setOpen}
                href={item.link}
                isExpanded={isExpanded}
                Icon={item.Icon}
                text={item.name}
                isActive={pathName?.startsWith(item.link || '')}
              />
            </AccessControl>
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
        <AccessControl roles={item.role} key={item.name}>
          <NavBarLink
            setOpen={setOpen}
            href={item.link}
            isActive={pathName?.startsWith(item.link || '')}
            isExpanded={isExpanded}
            Icon={item.Icon}
            text={item.name}
          />
        </AccessControl>
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
