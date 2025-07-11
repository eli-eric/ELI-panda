import { LinkIcon } from '@heroicons/react/24/outline'
import { type FC, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'

interface SystemLinkProps {
  href?: string
  uid?: string
  children: ReactNode
  icon?: ReactNode
  external?: boolean
  className?: string
  variant?: 'link' | 'button'
}

export const SystemLink: FC<SystemLinkProps> = ({
  children,
  icon,
  external = false,
  className,
  variant = 'link',
  uid
}) => {
  const { setUID } = useShowDeviceStore()
  const baseClasses = cn(
    'inline-flex items-center gap-2 text-sm font-medium',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
    'dark:focus:ring-offset-gray-800'
  )

  const variantClasses =
    variant === 'button'
      ? cn(
          'px-3 py-2 rounded-lg border',
          'bg-white dark:bg-gray-800',
          'border-gray-300 dark:border-gray-600',
          'text-gray-900 dark:text-gray-100',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'hover:border-gray-400 dark:hover:border-gray-500'
        )
      : cn(
          'px-3 py-2 rounded-lg',
          'text-primary-600 dark:text-primary-400',
          'hover:text-primary-800 dark:hover:text-primary-300',
          'hover:bg-primary-50 dark:hover:bg-primary-900/20',
          'border border-transparent hover:border-primary-200 dark:hover:border-primary-800'
        )

  const linkClasses = cn(baseClasses, variantClasses, className)

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {external && (
        <LinkIcon
          className="w-3 h-3 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        />
      )}
    </>
  )

  return (
    <button
      className={linkClasses}
      onClick={() => {
        setUID(uid)
      }}
    >
      {content}
    </button>
  )
}
