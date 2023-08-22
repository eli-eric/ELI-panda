import { InformationCircleIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import Tippy from '@tippyjs/react'
import { Fragment } from 'react'

import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'

export const DescriptionCell = ({ getValue }: CellContext<CatalogueItem, any>) => (
  <Fragment>
    {getValue() && (
      <Tippy content={getValue()}>
        <InformationCircleIcon className="h-6 w-6 flex-shrink-0" />
      </Tippy>
    )}
  </Fragment>
)
