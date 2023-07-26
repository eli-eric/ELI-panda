import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment } from 'react'

import { LinkDecorator } from '@/components/decorators'
import type { CatalogueItem } from '@/types/responses'

export const ManufacturerUrl = ({ getValue }: CellContext<CatalogueItem, any>) => (
  <Fragment>
    {getValue() && (
      <Link href={getValue()} passHref legacyBehavior>
        <LinkDecorator>
          <a target="_blank">link</a>
        </LinkDecorator>
      </Link>
    )}
  </Fragment>
)
