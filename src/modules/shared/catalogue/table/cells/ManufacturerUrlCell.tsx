import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import { message } from '@/i18n/src/messages'
import type { CatalogueItem } from '@/types/responses/catalogue'

export const ManufacturerUrl = ({
  getValue
}: CellContext<CatalogueItem, any>) => {
  const { formatMessage: fm } = useIntl()
  
  return (
    <Fragment>
      {getValue() && (
        <Link href={getValue()} passHref legacyBehavior>
          <a target="_blank">
            <LinkDecorator>
              {getValue().substring(0, 25) + fm({ id: message.common.catalogue.ellipsis })}
            </LinkDecorator>
          </a>
        </Link>
      )}
    </Fragment>
  )
}
