import classNames from 'classnames'
import Link from 'next/link'
import type { ElementType } from 'react'
import { type FC, type PropsWithChildren } from 'react'

interface NavBarItemProps {
  isExpanded: boolean
  text?: string
  Icon?: ElementType
  isActive?: boolean
}

export const NavBarItem: FC<PropsWithChildren<NavBarItemProps>> = ({ isExpanded, text, Icon, isActive, children }) => {
  return (
    <div className="flex">
      {Icon && (
        <div>
          <Icon className={classNames('h-6 w-6 text-gray-200', isActive && 'text-primary-600')} />
        </div>
      )}
      <span
        className={classNames(
          `ml-4`,
          isExpanded ? 'opacity-100' : 'opacity-0',
          `transition-opacity duration-200 whitespace-nowrap text-gray-200`,
          isActive && 'text-primary-600'
        )}
      >
        {text}
      </span>
    </div>
  )
}

interface NavBarLinkProps {
  href?: string
}
export const NavBarLink: FC<PropsWithChildren<NavBarLinkProps>> = ({ href = '#', children }) => {
  return (
    <Link href={href} className="flex items-center p-4 hover:bg-gray-700">
      {children}
    </Link>
  )
}

export const NavBarButton: FC<PropsWithChildren<{ onClick: () => void }>> = ({ onClick, children }) => {
  return (
    <div className="p-4 hover:bg-gray-700">
      <button className="flex items-center justify-between w-full" onClick={onClick}>
        {children}
      </button>
    </div>
  )
}
