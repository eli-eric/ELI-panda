import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { PATH } from '@/types/constants/paths'
import type { CatalogueItem } from '@/types/responses'

export const CategoryName = ({
  getValue,
  row: {
    original: { categoryUID }
  }
}: CellContext<CatalogueItem, any>) => {
  const router = useRouter()
  const link = PATH.CATALOGUE + '/' + categoryUID
  return (
    <Fragment>
      <Link href={{ pathname: link, query: { search: router.query.search } }}>
        <LinkDecorator>{getValue()}</LinkDecorator>
      </Link>
    </Fragment>
  )
}
