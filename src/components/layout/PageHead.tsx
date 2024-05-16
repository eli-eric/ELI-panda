import type { FC, PropsWithChildren } from 'react'

import Card from './Card'

export const PageHead: FC<PropsWithChildren> = ({ children }) => (
  <div
    id="page-head"
    className="sticky top-0 z-20 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b"
  >
    <Card className="flex flex-1 justify-between">
      <div className="flex items-center flex-1 justify-between mr-2">
        {children}
      </div>
    </Card>
  </div>
)
