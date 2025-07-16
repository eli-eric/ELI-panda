import { LinkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

type Props = {
  title: string
  value?: string | null
  className?: string
  additionalInfo?: string
  unit?: string
  href?: string
}

export const SystemDetailParameter: FC<Props> = ({
  title,
  value,
  className,
  additionalInfo,
  unit,
  href
}) => {
  const baseClasses = cn(
    'flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200',
    href
      ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group'
      : 'hover:bg-orange-50 dark:hover:bg-orange-800/20 hover:border-orange-200 dark:hover:border-orange-700 border border-transparent group'
  )

  const content = (
    <>
      <span className="font-medium text-gray-600 dark:text-gray-400 flex items-center">
        {title}:
        {href && (
          <LinkIcon className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400" />
        )}
      </span>
      <div className="text-right max-w-[60%]">
        <span
          className={cn(
            'truncate',
            href
              ? 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300'
              : 'text-gray-900 dark:text-gray-200',
            className
          )}
          title={value || 'N/A'}
        >
          {value ? value : 'N/A'} {unit && `[${unit}]`}
        </span>
        {additionalInfo && (
          <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
            {additionalInfo}
          </div>
        )}
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" className={baseClasses}>
        {content}
      </Link>
    )
  }

  return <div className={baseClasses}>{content}</div>
}
