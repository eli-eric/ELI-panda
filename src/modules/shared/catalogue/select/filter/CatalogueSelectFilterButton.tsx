import { Filter } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

import { useCatalogueSelectFilterSheet } from './hooks/useCatalogueSelectFilterSheet'

interface Props {
  tableId: string
  catalogueCategoryProperties?: CatalogueItemDetail[]
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const CatalogueSelectFilterButton = ({
  tableId,
  catalogueCategoryProperties,
  side = 'right'
}: Props) => {
  const openFilterSheet = useCatalogueSelectFilterSheet()

  const { storeFilters } = useFormFilterState({
    tableId,
    enableQueryUrl: false
  })

  const handleOpenFilters = () => {
    openFilterSheet({
      tableId,
      catalogueCategoryProperties,
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
