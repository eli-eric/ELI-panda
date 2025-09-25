import { Filter } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'

import { useOrdersFilterSheet } from './hooks/useOrdersFilterSheet'

interface Props {
  tableId?: string
  enableQueryURL?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const OrderFilterButton = ({
  tableId = 'orders',
  enableQueryURL = true,
  side = 'left'
}: Props) => {
  const openFilterSheet = useOrdersFilterSheet()

  const { storeFilters } = useFormFilterState({
    tableId,
    enableQueryUrl: enableQueryURL
  })

  const handleOpenFilters = () => {
    openFilterSheet({
      tableId,
      enableQueryURL,
      side
    })
  }
  return (
    <Fragment>
      <Tooltip
        content={storeFilters.length > 0 ? 'Filters Applied' : 'Open Filters'}
      >
        <div>
          <Button size="sm" variant="outline" onClick={handleOpenFilters}>
            <Filter
              className={`h-4 w-4 ${storeFilters.length > 0 ? 'fill-current' : ''}`}
              aria-hidden="true"
            />
          </Button>
        </div>
      </Tooltip>
    </Fragment>
  )
}
