import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import { Fragment } from 'react'

import type { CatalogueItem } from '@/types/responses'

export const DescriptionCell = ({ getValue }: CellContext<CatalogueItem, any>) => (
  <Fragment>
    {getValue() && (
      <InformationCircleIcon
        className="h-6 w-6 flex-shrink-0"
        data-tooltip-id="tooltip"
        data-tooltip-content={getValue()}
      />
    )}
  </Fragment>
)
