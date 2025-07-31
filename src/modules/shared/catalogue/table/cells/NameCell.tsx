import type { CellContext } from '@tanstack/react-table'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { CatalogueStatisticsContainer } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.cont'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'
import type { CatalogueItem } from '@/types/responses/catalogue'
import { truncateString } from '@/utils'
import { createMessageValues } from '@/utils/formatters'

const modalMessage = message.ordersPage.deleteModal

interface NameProps extends CellContext<CatalogueItem, any> {
  hideButtons?: boolean
  tableId?: string
}

//TODO: permissions
export const NameCell = ({
  getValue,
  row: {
    original: { uid }
  },
  hideButtons,
  tableId
}: NameProps) => {
  return (
    <div className="flex items-center justify-between w-full flex-row-reverse">
      {!hideButtons && (
        <CellActionDropdown tableId={tableId} uid={uid} value={getValue()} />
      )}
      <div className="flex-1 min-w-0 flex items-center justify-start">
        <Tooltip content={getValue()}>
          <Link
            href={{ pathname: '/catalogue/item/' + uid }}
            target={tableId === 'catalogueItemsModal' ? '_blank' : undefined}
            className="flex items-center"
          >
            <Button variant={'link'} className="cursor-pointer">
              {truncateString(getValue(), 50)}
            </Button>
          </Link>
        </Tooltip>
      </div>
    </div>
  )
}

const CellActionDropdown = ({
  tableId,
  uid,
  value
}: {
  tableId?: string
  uid: string
  value: string
}) => {
  const { catalogueItem } = useEndpoint({ uid })
  const { formatMessage } = useIntl()
  const { refetch, catalogueItems } = useCatalogueItems(tableId)
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const openModal = useModalGlobalStore(state => state.openModal)
  const withWarningModal = useWarningModal()

  const deleteSubmit = useSubmit({
    endpoint: catalogueItem,
    method: 'delete',
    onSuccess: () => {
      catalogueItems && refetch()
      toast.success('Successfully deleted ' + value)
    },
    onError: e => {
      if (e?.response?.status === 409) {
        toast.error(`Can't delete ${value}, it is binded in another items.`)
      } else {
        toast.error(`Error deleting ${value}.`)
      }
    }
  })

  return (
    <div className="flex items-center pl-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Item actions"
            variant="ghost"
            tabIndex={0}
            className="has-[>svg]:px-1 cursor-pointer"
          >
            <MoreVertical className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={4}>
          <DropdownMenuItem
            onClick={() => {
              openModal('dialog1', {
                component: CatalogueStatisticsContainer,
                props: {
                  catalogueItemUid: uid,
                  variant: 'modal',
                  title: 'Physical Items Statistics',
                  size: 'xl'
                }
              })
            }}
          >
            Show Statistics
          </DropdownMenuItem>
          {canEdit && (
            <DropdownMenuItem
              onClick={() => {
                withWarningModal(
                  () => deleteSubmit.submit(),
                  formatMessage(
                    { id: modalMessage.message },
                    createMessageValues({ name: value })
                  )
                )()
              }}
              className="text-destructive"
            >
              Delete Item
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
