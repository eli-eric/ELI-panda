import type { FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const Badge: FC<PropsWithChildren<Props>> = ({
  children,
  className
}) => (
  <span
    className={cn(
      'inline-flex  items-center rounded-full bg-primary-100 dark:bg-primary-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200',
      className
    )}
  >
    {children}
  </span>
)
