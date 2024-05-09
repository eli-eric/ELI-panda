import Link from 'next/link'

import { LinkDecorator } from '@/components/decorators'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { PATH } from '@/types/constants/paths'

import { useRelatedItems } from '../../hooks/useItem'
import { AddRelatatedItemButton } from './AddRelatatedItemButton'
import { TableDeleteButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import { DescriptionCell } from '@/modules/shared/catalogue/table/cells/DescriptionCell'
import useWarningModal from '@/hooks/useWarningModal'
import { useDisconnectRelatedItem } from '../../hooks/useDisconnectRelatedItem'
import { useRouter } from 'next/router'

export const RelatedItemsContainer = () => {
  const { data } = useRelatedItems()
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const router = useRouter()
  const itemUid = router.query.uid as string
  const withWarn = useWarningModal('Are you sure you want to delete relation?')
  const { refetch } = useRelatedItems()
  const { disconnectRelatedItem } = useDisconnectRelatedItem()

  const onDisconnect = (uid: string) => () => {
    disconnectRelatedItem(
      {
        where: {
          uid: itemUid
        },
        update: {
          relatedCatalogueItems: [
            {
              disconnect: [
                {
                  where: {
                    node: {
                      uid: uid
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      {
        onSuccess: () => {
          refetch()
        }
      }
    )
  }

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
                  <div className="flex items-center justify-between">
                    <Link href={PATH.CATALOGUE_ITEM + `/${original.uid}`}>
                      <LinkDecorator>{getValue()}</LinkDecorator>
                    </Link>
                    {canEdit && (
                      <TableDeleteButton
                        onClick={withWarn(onDisconnect(original.uid))}
                      />
                    )}
                  </div>
                )
              }
            },
            {
              header: 'Catalogue category',
              accessorFn: row => row.catalogueCategory?.name
            },
            {
              header: 'Description',
              accessorFn: row => row.description,
              cell: DescriptionCell
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
