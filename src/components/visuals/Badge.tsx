import type { FC, PropsWithChildren } from 'react'

export const Badge: FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex mr-1 mb-1 items-center rounded-full bg-primary-100 dark:bg-primary-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
    {children}
  </span>
)
