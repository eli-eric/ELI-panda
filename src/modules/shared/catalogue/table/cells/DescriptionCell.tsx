import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import { Fragment } from 'react'

import { Tooltip } from '@/components/Tooltip'
import type { CatalogueItem } from '@/types/responses'

export const DescriptionCell = ({ getValue }: CellContext<CatalogueItem, any>) => (
  <Fragment>
    {getValue() && (
      <Tooltip content={getValue()}>
        <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
      </Tooltip>
    )}
  </Fragment>
)
