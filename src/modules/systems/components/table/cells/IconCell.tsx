import {
  BarChart3,
  Beaker,
  Box,
  RefreshCw,
  Settings,
  ShoppingBag
} from 'lucide-react'
import type { FC } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { ITEM_USAGE } from '@/modules/systems/types/constants'

interface Props {
  itemUsageUid?: ITEM_USAGE
}

export const IconCell: FC<Props> = ({ itemUsageUid }) => {
  switch (itemUsageUid) {
    case ITEM_USAGE.SPARE_PART: {
      return (
        <Tooltip content="Spare part">
          <Settings className="h-4 w-4 text-red-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.IN_SYSTEM_PART: {
      return (
        <Tooltip content="In system part">
          <Box className="h-4 w-4 text-cyan-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.STOCK_ITEM: {
      return (
        <Tooltip content="Stock item">
          <ShoppingBag className="h-4 w-4 text-indigo-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.EXPERIMENTAL_LOAN_POOL_PART: {
      return (
        <Tooltip content="Experimental loan pool part">
          <Beaker className="h-4 w-4 text-purple-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.TEST_AND_MEASURMENT: {
      return (
        <Tooltip content="Test and measurment">
          <BarChart3 className="h-4 w-4 text-teal-500" />
        </Tooltip>
      )
    }
    case ITEM_USAGE.OTHER: {
      return (
        <Tooltip content="Other">
          <RefreshCw className="h-4 w-4 text-amber-500" />
        </Tooltip>
      )
    }
  }
}
