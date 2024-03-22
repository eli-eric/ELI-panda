import Link from 'next/link'

import { LinkDecorator } from '@/components/decorators'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { PATH } from '@/types/constants/paths'

import { useRelatedItems } from '../../hooks/useItem'
import { AddRelatatedItemButton } from './AddRelatatedItemButton'

export const RelatedItemsContainer = () => {
  const { data } = useRelatedItems()

  return (
    <div className="pt-10">
      <Heading customText="Related Items">
        <AddRelatatedItemButton />
      </Heading>
      {data && data?.length > 0 && (
        <PandaTable
          tableId="relatedItems"
          data={data}
          columns={[
            {
              header: 'Name',
              accessorKey: 'name',
              cell: ({ row: { original }, getValue }) => {
                return (
                  <Link href={PATH.CATALOGUE_ITEM + `/${original.uid}`}>
                    <LinkDecorator>{getValue()}</LinkDecorator>
                  </Link>
                )
              }
            },
            {
              header: 'Catalogue category',
              accessorFn: row => row.catalogueCategory?.name
            },
            {
              header: 'Supplier',
              accessorFn: row => row.supplier?.name
            },
            {
              header: 'Part Number',
              accessorKey: 'catalogueNumber'
            }
          ]}
        />
      )}
    </div>
  )
}
