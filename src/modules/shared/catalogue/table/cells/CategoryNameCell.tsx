import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { LinkDecorator } from '@/components/decorators'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { PATH } from '@/types/constants/paths'

export const CategoryName = ({
  getValue,
  row: {
    original: { categoryPath }
  }
}: CellContext<CatalogueItem, any>) => {
  const router = useRouter()
  const link = PATH.CATALOGUE + '/' + categoryPath
  return (
    <Fragment>
      <Link href={{ pathname: link, query: { search: router.query.search } }}>
        <LinkDecorator>{getValue()}</LinkDecorator>
      </Link>
    </Fragment>
  )
}
