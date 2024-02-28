import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import type { ElementType } from 'react'
import { type FC, type PropsWithChildren } from 'react'

import usePermission from '@/hooks/usePermission'
import { SUPPORT } from '@/types/constants/paths'
import type { ROLE } from '@/types/constants/roles'

export const NavBarTitle: FC<PropsWithChildren<{ isActive?: boolean; isExpanded: boolean }>> = ({
  isActive,
  isExpanded,
  children
}) => {
  return (
    <span
      className={classNames(
        `ml-4`,
        isExpanded ? 'opacity-100' : 'opacity-0',
        `transition-opacity duration-200 whitespace-nowrap text-gray-200`,
        isActive && 'text-primary-600'
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

const NavBarItem: FC<PropsWithChildren<NavBarItemProps>> = ({ isExpanded, text, Icon, isActive }) => {
  return (
    <div className="flex">
      {Icon && (
        <div>
          <Icon className={classNames('h-6 w-6 text-gray-200', isActive && 'text-primary-600')} />
        </div>
      )}
      <NavBarTitle isActive={isActive} isExpanded={isExpanded}>
        {text}
      </NavBarTitle>
    </div>
  )
}

interface NavBarLinkProps extends NavBarItemProps {
  href?: string
  className?: string
  role: ROLE
}
export const NavBarLink: FC<NavBarLinkProps> = ({ className, href = '#', isExpanded, Icon, isActive, text, role }) => {
  const permission = usePermission([role])
  if (!permission) return null
  return (
    <Link href={href} className={classNames('flex items-center p-4 hover:bg-gray-700', className)}>
      <NavBarItem isExpanded={isExpanded} Icon={Icon} text={text} isActive={isActive} />
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
    <button className="flex items-center justify-between w-full p-4 hover:bg-gray-700" onClick={onClick}>
      <NavBarItem isExpanded={isExpanded} Icon={Icon} text={text} isActive={isActive} />
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
    <div className={classNames('transition-opacity duration-300', isExpanded ? 'opacity-100' : 'opacity-0')}>
      {open ? (
        <ChevronDownIcon className="ml-auto h-5 w-5 text-gray-200" />
      ) : (
        <ChevronRightIcon className="ml-auto h-5 w-5 text-gray-200" />
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
      <a target={'_blank'} rel="noreferrer" className="flex items-center p-4 text-center hover:bg-gray-700">
        <div className="ml-1">
          <span className={classNames('h-6 w-6 text-2xl text-center text-white')}>?</span>
        </div>
        <NavBarTitle isExpanded={isExpanded} isActive={false}>
          Support
        </NavBarTitle>
      </a>
    </Link>
  )
}
