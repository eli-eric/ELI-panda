import { Filter } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useSystemsFilterSheetV2 } from '@/modules/systems/components/filters/hooks/useSystemsFilterSheetV2'

export type DisabledFields = {
  [key: string]: boolean
}

interface Props {
  tableId?: string
  enableQueryURL?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  disabledFields?: DisabledFields
}

/**
 * V2 Filter button using new dynamic modal system
 * This version opens filters in a sheet with proper z-index management
 * Can be used inside dialogs without z-index conflicts
 */
export const SystemFilterButtonV2 = ({
  tableId = 'systems',
  enableQueryURL = true,
  disabledFields,
  side = 'left'
}: Props) => {
  const openFilterSheet = useSystemsFilterSheetV2()

  const { storeFilters } = useFormFilterState({
    tableId,
    enableQueryUrl: enableQueryURL
  })

  const handleOpenFilters = () => {
    openFilterSheet({
      tableId,
      enableQueryURL,
      disabledFields,
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
