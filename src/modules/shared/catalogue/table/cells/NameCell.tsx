import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { TableActionsButtons, TableStatsButton } from '@/components/Buttons'
import { LinkDecorator } from '@/components/decorators'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useModal } from '@/hooks/useModal'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { CatalogueStatisticsContainer } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.cont'
import { ROLE } from '@/types/constants/roles'
import type { CatalogueItem } from '@/types/responses'
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
  const { catalogueItem } = useEndpoint({ uid })
  const { formatMessage } = useIntl()
  const { mutate, catalogueItems } = useCatalogueItems(tableId)
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const setOpenStats = useModal(<CatalogueStatisticsContainer catalogueItemUid={uid} />)
  const withWarningModal = useWarningModal()

  const deleteSubmit = useSubmit({
    endpoint: catalogueItem,
    method: 'delete',
    onSuccess: () => {
      catalogueItems && mutate({ ...catalogueItems, data: catalogueItems?.data?.filter(item => item.uid !== uid) })
    },
    onError: e => {
      if (e?.response?.status === 409) {
        toast.error(`Can't delete ${getValue()}, it is binded in another items.`)
      } else {
        toast.error(`Error deleting ${getValue()}.`)
      }
    }
  })

  return (
    <div className="flex items-center">
      {tableId === 'catalogueItemsModal' ? (
        <Link href={{ pathname: '/catalogue/item/' + uid }} legacyBehavior className="flex items-center">
          <a target="_blank" rel="noopener noreferrer">
            <LinkDecorator>
              <span>{getValue()}</span>
            </LinkDecorator>
          </a>
        </Link>
      ) : (
        <Link href={{ pathname: '/catalogue/item/' + uid }} className="flex items-center">
          <LinkDecorator>
            <span>{getValue()}</span>
          </LinkDecorator>
        </Link>
      )}
      {!hideButtons && (
        <TableActionsButtons
          onDeleteClick={() => {
            withWarningModal(
              () => deleteSubmit.submit(),
              formatMessage({ id: modalMessage.message }, createMessageValues({ name: getValue() }))
            )()
          }}
          canEdit={canEdit}
        >
          <TableStatsButton
            onClick={() => {
              setOpenStats()()
            }}
          />
        </TableActionsButtons>
      )}
    </div>
  )
}
