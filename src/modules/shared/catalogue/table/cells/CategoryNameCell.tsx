import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { PATH } from '@/types/constants/paths'
import type { CatalogueItem } from '@/types/responses'

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
      <Link href={{ pathname: link, query: { search: router.query.search } }} className="text-blue-500 hover:underline">
        {getValue()}
      </Link>
    </Fragment>
  )
}
