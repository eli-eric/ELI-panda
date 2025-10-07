import type { CellContext } from '@tanstack/react-table'
import { Info } from 'lucide-react'
import { Fragment } from 'react'

import { Tooltip } from '@/components/Tooltip'
import type { CatalogueItem } from '@/types/responses/catalogue'

export const DescriptionCell = ({
  getValue
}: CellContext<CatalogueItem, any>) => (
  <Fragment>
    {getValue() && (
      <Tooltip content={getValue()}>
        <Info className="h-6 w-6 shrink-0" />
      </Tooltip>
    )}
  </Fragment>
)
