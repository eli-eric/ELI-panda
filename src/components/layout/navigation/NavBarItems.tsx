import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ElementType } from 'react'
import { type FC, Fragment, type PropsWithChildren } from 'react'

import { AccessControl } from '@/components/auth/AccesControl'
import { Tooltip } from '@/components/Tooltip'
import type { NavigationType } from '@/types/constants/paths'
import { SUPPORT } from '@/types/constants/paths'
import { cx } from '@/utils'

export const NavBarTitle: FC<
  PropsWithChildren<{
    className?: string
    isActive?: boolean
    isExpanded: boolean
  }>
> = ({ isActive, isExpanded, children, className }) => {
  return (
    <span
      className={cx(
        `ml-4 z-0`,
        isExpanded ? 'opacity-100' : 'opacity-0',
        `transition-opacity duration-200 whitespace-nowrap text-gray-600 dark:text-gray-200`,
        isActive && 'text-primary-600 dark:text-primary-600',
        className
      )}
    >
      {children}
    </span>
  )
}

interface NavBarItemProps {
  isExpanded: boolean
  text?: string
  Icon?: ElementType
  isActive?: boolean
}

const NavBarItem: FC<PropsWithChildren<NavBarItemProps>> = ({
  isExpanded,
  text,
  Icon,
  isActive
}) => {
  return (
    <div className={cx('flex ')}>
      <Tooltip content={text} placement="top-start" disabled={isExpanded}>
        {Icon && (
          <div>
            <Icon
              className={cx(
                'h-6 w-6 text-gray-600 dark:text-gray-200',
                isActive && 'text-primary-600 dark:text-primary-600'
              )}
            />
          </div>
        )}
      </Tooltip>
      <NavBarTitle isActive={isActive} isExpanded={isExpanded}>
        {text}
      </NavBarTitle>
    </div>
  )
}

interface NavBarLinkProps extends NavBarItemProps {
  href?: string
  className?: string
  setOpen?: (open: boolean) => void
}
export const NavBarLink: FC<NavBarLinkProps> = ({
  setOpen,
  className,
  href = '#',
  isExpanded,
  Icon,
  isActive,
  text
}) => {
  return (
    <Link
      href={href}
      onClick={() => setOpen && setOpen(false)}
      className={cx(
        'flex items-center p-4 overflow-hidden hover:bg-gray-300 hover:dark:bg-gray-700',
        className
      )}
    >
      <NavBarItem
        isExpanded={isExpanded}
        Icon={Icon}
        text={text}
        isActive={isActive}
      />
    </Link>
  )
}

interface NavBarButtonProps extends NavBarItemProps {
  onClick?: () => void
}

export const NavBarButton: FC<PropsWithChildren<NavBarButtonProps>> = ({
  onClick,
  isExpanded,
  Icon,
  isActive,
  text,
  children
}) => {
  return (
    <button
      className="flex items-center overflow-hidden justify-between w-full p-4 hover:dark:bg-gray-700 hover:bg-gray-300"
      onClick={onClick}
    >
      <NavBarItem
        isExpanded={isExpanded}
        Icon={Icon}
        text={text}
        isActive={isActive}
      />
      {children}
    </button>
  )
}

interface ChevronIconProps {
  isExpanded: boolean
  open: boolean
}

export const ChevronIcon: FC<ChevronIconProps> = ({ isExpanded, open }) => {
  return (
    <div
      className={cx(
        'transition-opacity duration-300',
        isExpanded ? 'opacity-100' : 'opacity-0'
      )}
    >
      {open ? (
        <ChevronDownIcon className="ml-auto h-5 w-5 dark:text-gray-200 text-gray-600" />
      ) : (
        <ChevronRightIcon className="ml-auto h-5 w-5 dark:text-gray-200 text-gray-600 " />
      )}
    </div>
  )
}

interface SupportLinkProps {
  isExpanded: boolean
}

export const SupportLink: FC<SupportLinkProps> = ({ isExpanded }) => {
  return (
    <Link href={SUPPORT} legacyBehavior>
      <a
        target={'_blank'}
        rel="noreferrer"
        className="flex items-center p-4 text-center hover:bg-gray-300 hover:dark:bg-gray-700"
      >
        <Tooltip content="Support" placement="top-start" disabled={isExpanded}>
          <div className="ml-2">
            <span
              className={cx(
                'h-6 w-6 text-2xl text-center text-gray-500 dark:text-gray-200'
              )}
            >
              ?
            </span>
          </div>
        </Tooltip>
        <NavBarTitle className="ml-5" isExpanded={isExpanded} isActive={false}>
          Support
        </NavBarTitle>
      </a>
    </Link>
  )
}

interface NavBarMultiLinkProps {
  item: NavigationType
  isExpanded: boolean
  toggleItemExpansion: (itemName: string) => void
  expandedItems: Record<string, boolean>
  setOpen?: (open: boolean) => void
}

export const NavBarMultiLink: FC<NavBarMultiLinkProps> = ({
  toggleItemExpansion,
  item,
  isExpanded,
  expandedItems,
  setOpen
}) => {
  const pathName = usePathname()
  return (
    <div key={item.name} className="flex flex-col ">
      <NavBarButton
        isExpanded={isExpanded}
        onClick={() => toggleItemExpansion(item.name)}
        Icon={item.Icon}
        text={item.name}
        isActive={item.links?.some(subItem =>
          pathName?.startsWith(subItem.path)
        )}
      >
        <ChevronIcon isExpanded={isExpanded} open={expandedItems[item.name]} />
      </NavBarButton>
      {expandedItems[item.name] && (
        <Fragment>
          {item.links?.map(subItem => (
            <AccessControl roles={subItem.role} key={subItem.name}>
              <NavBarLink
                className="text-xs pl-10"
                setOpen={setOpen}
                href={subItem.path}
                isExpanded={isExpanded}
                text={subItem.name}
                isActive={pathName?.startsWith(subItem.path)}
              />
            </AccessControl>
          ))}
        </Fragment>
      )}
    </div>
  )
}
