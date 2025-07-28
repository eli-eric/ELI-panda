import Link from 'next/link'
import { useRouter } from 'next/router'

import { TableDeleteButton } from '@/components/Buttons'
import { LinkDecorator } from '@/components/decorators'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { DescriptionCell } from '@/modules/shared/catalogue/table/cells/DescriptionCell'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useDisconnectRelatedItem } from '../../hooks/useDisconnectRelatedItem'
import { useRelatedItems } from '../../hooks/useRelatedItems'
import { useRelatedItemsFor } from '../../hooks/useRelatedItemsFor'
import { AddRelatatedItemButton } from './AddRelatatedItemButton'

export const RelatedItemsContainer = () => {
  const { data: relatedItems, refetch, loading } = useRelatedItems()
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const router = useRouter()
  const itemUid = router.query.uid as string
  const withWarn = useWarningModal('Are you sure you want to delete relation?')
  const { disconnectRelatedItem } = useDisconnectRelatedItem()
  const {
    data: relItemsFor,
    refetch: refethItemsFor,
    loading: relItemsLoading
  } = useRelatedItemsFor()

  const data = relatedItems?.concat(relItemsFor || [])

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
          ],
          relatedCatalogueItemsFor: [
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
          refethItemsFor()
        }
      }
    )
  }

  return (
    <div className="pt-10">
      <Heading customText="Related Items" showBorder={false}>
        <AddRelatatedItemButton />
      </Heading>

      <Table<any>
        data={data || []}
        loading={loading || relItemsLoading}
        emptyMessage="No related items"
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
    </div>
  )
}
