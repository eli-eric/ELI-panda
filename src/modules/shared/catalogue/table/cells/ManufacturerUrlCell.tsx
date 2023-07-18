import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment } from 'react'

import type { CatalogueItem } from '@/types/responses'

export const ManufacturerUrl = ({ getValue }: CellContext<CatalogueItem, any>) => (
  <Fragment>
    {getValue() && (
      <Link href={getValue()} passHref legacyBehavior>
        <a target="_blank" className="text-blue-500 hover:underline">
          link
        </a>
      </Link>
    )}
  </Fragment>
)
