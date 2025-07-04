import Link from 'next/link'
import { type FC, type ReactNode } from 'react'

import { cx } from '@/utils'

interface SystemLinkProps {
  href: string
  children: ReactNode
  icon?: ReactNode
  external?: boolean
  className?: string
  variant?: 'link' | 'button'
}

export const SystemLink: FC<SystemLinkProps> = ({
  href,
  children,
  icon,
  external = false,
  className,
  variant = 'link'
}) => {
  const baseClasses = cx(
    'inline-flex items-center gap-2 text-sm font-medium',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
    'dark:focus:ring-offset-gray-800'
  )

  const variantClasses =
    variant === 'button'
      ? cx(
          'px-3 py-2 rounded-lg border',
          'bg-white dark:bg-gray-800',
          'border-gray-300 dark:border-gray-600',
          'text-gray-900 dark:text-gray-100',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'hover:border-gray-400 dark:hover:border-gray-500'
        )
      : cx(
          'px-3 py-2 rounded-lg',
          'text-primary-600 dark:text-primary-400',
          'hover:text-primary-800 dark:hover:text-primary-300',
          'hover:bg-primary-50 dark:hover:bg-primary-900/20',
          'border border-transparent hover:border-primary-200 dark:hover:border-primary-800'
        )

  const linkClasses = cx(baseClasses, variantClasses, className)

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {external && (
        <svg
          className="w-3 h-3 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </>
  )

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className={linkClasses}
    >
      {content}
    </Link>
  )
}
