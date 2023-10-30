import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { PATH } from '@/types/constants/paths'
import type { CatalogueItem } from '@/types/responses'

export const CategoryName = ({ getValue }: CellContext<CatalogueItem, any>) => {
  const router = useRouter()
  const link = PATH.CATALOGUE + '/' + getValue()?.uid
  return (
    <Fragment>
      <Link href={{ pathname: link, query: { search: router.query.search } }}>
        <LinkDecorator>{getValue()?.name}</LinkDecorator>
      </Link>
    </Fragment>
  )
}
