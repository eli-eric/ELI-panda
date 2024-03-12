import {
  ArrowPathRoundedSquareIcon,
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  CubeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/solid'
import type { CellContext } from '@tanstack/react-table'
import type { FC } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { ITEM_USAGE } from '@/modules/systems/types/constants'
import type { SystemDetail } from '@/modules/systems/types/responses'

export const IconCell: FC<CellContext<SystemDetail, any>> = ({ row }) => {
  switch (row.original.physicalItem?.itemUsage?.uid) {
    case ITEM_USAGE.SPARE_PART: {
      return (
        <Tooltip content="Spare part">
          <CogIcon className="h-4 w-4 text-red-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.IN_SYSTEM_PART: {
      return (
        <Tooltip content="In system part">
          <CubeIcon className="h-4 w-4 text-cyan-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.STOCK_ITEM: {
      return (
        <Tooltip content="Stock item">
          <ShoppingBagIcon className="h-4 w-4 text-indigo-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.EXPERIMENTAL_LOAN_POOL_PART: {
      return (
        <Tooltip content="Experimental loan pool part">
          <BeakerIcon className="h-4 w-4 text-purple-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.TEST_AND_MEASURMENT: {
      return (
        <Tooltip content="Test and measurment">
          <ChartBarIcon className="h-4 w-4 text-teal-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.OTHER: {
      return (
        <Tooltip content="Other">
          <ArrowPathRoundedSquareIcon className="h-4 w-4 text-amber-500" />
        </Tooltip>
      )
    }
  }
}
