import { CogIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import type { FC } from 'react'

import type { SystemDetail } from '@/modules/systems/types/responses'

export const IconCell: FC<CellContext<SystemDetail, any>> = ({ row }) => {
  return (
    <div>
      <CogIcon className="h-3 w-3 text-gray-500 dark:text-gray-200" />
    </div>
  )
}
