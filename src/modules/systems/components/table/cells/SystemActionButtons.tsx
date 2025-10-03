import {
  Edit,
  MoreVertical,
  Network,
  Plus,
  Settings,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Heading } from '@/components/layout/Heading'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'
import { openGraphModal } from '@/modules/shared/system/GraphModal'
import { useSystemCreateSheet } from '@/modules/shared/system/system-create/useSystemCreateSheet'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { useSystemDelete } from '@/modules/systems/hooks/useSystemDelete'
import { useSparePartsColumns } from '@/modules/systemsSpareParts/components/SpareParts.columns'
import {
  useGetSpareParts,
  useGetSparePartsFor
} from '@/modules/systemsSpareParts/hooks/useGetSpareParts'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { PATH } from '@/types/constants/paths'
import type { SystemDetail } from '@/types/responses/systems'
import type { EndpointProps } from '@/utils/getEndpoints'

const messages = message.systemsPage.systemActions

interface Props {
  hideButtons?: boolean
  tableId: string
  original: SystemDetail
  sparesIn?: number
  sparesOut?: number
  canEdit: boolean
  queryKey?: [string, EndpointProps]
}

const SparePartsModal = ({ uid }: { uid: string }) => {
  const { spareParts, loading } = useGetSpareParts(uid)
  const sparePartsColumns = useSparePartsColumns({ tableId: 'sparePartsModal' })
  return (
    <Fragment>
      <Heading key={messages.sparePartsModalTitle} />
      <PandaTable
        {...{
          tableId: 'sparePartsModal',
          data: spareParts,
          columns: sparePartsColumns,
          loading,
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}

const SparePartsForModal = ({ uid }: { uid: string }) => {
  const { spareParts, loading } = useGetSparePartsFor(uid)
  const sparePartsColumns = useSparePartsColumns({
    tableId: 'sparePartsForModal'
  })
  return (
    <Fragment>
      <Heading text={messages.sparePartsForModalTitle} />
      <PandaTable
        {...{
          tableId: 'sparePartsForModal',
          data: spareParts,
          columns: sparePartsColumns,
          loading,
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}

export const SystemActionButtons = ({
  hideButtons,
  tableId,
  original,
  sparesIn,
  sparesOut,
  canEdit,
  queryKey
}: Props) => {
  const { deleteSystem } = useSystemDelete({
    system: original,
    queryKey
  })

  const { openModal } = useModalGlobalStore()
  const openSystemCreateSheet = useSystemCreateSheet()

  const handleDelete = () => {
    deleteSystem()
  }

  const handleShowGraph = () => {
    openGraphModal(original.uid)
  }

  const handleShowSpareParts = () => {
    openModal('dialog1', {
      component: SparePartsModal,
      props: { uid: original.uid }
    })
  }

  const handleShowSparePartsFor = () => {
    openModal('dialog1', {
      component: SparePartsForModal,
      props: { uid: original.uid }
    })
  }

  if (hideButtons) {
    return null
  }

  const hasSparesIn = sparesIn && sparesIn > 0
  const hasSparesOut = sparesOut && sparesOut > 0
  const isSystemsTable = tableId === 'systems'

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={messages.ariaLabel}
            className="h-8 w-8 p-0"
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4}>
          <DropdownMenuItem asChild>
            <Link
              href={PATH.SYSTEM + '/' + original.uid}
              target="_blank"
              className="flex items-center cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-2" />
              <FormattedMessage id={messages.viewDetail} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleShowGraph}
            className="cursor-pointer"
          >
            <Network className="h-4 w-4 mr-2" />
            <FormattedMessage id={messages.showGraph} />
          </DropdownMenuItem>

          {/* Spare Parts Options */}
          {!!isSystemsTable && !!hasSparesIn && (
            <DropdownMenuItem
              onClick={handleShowSpareParts}
              className="cursor-pointer"
            >
              <Settings className="h-4 w-4 mr-2" />
              <FormattedMessage
                id={messages.showSpareParts}
                values={{ count: sparesIn }}
              />
            </DropdownMenuItem>
          )}

          {!!isSystemsTable && !!hasSparesOut && (
            <DropdownMenuItem
              onClick={handleShowSparePartsFor}
              className="cursor-pointer"
            >
              <Settings className="h-4 w-4 mr-2" />
              <FormattedMessage
                id={messages.showSparePartsFor}
                values={{ count: sparesOut }}
              />
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              onClick={() => openSystemCreateSheet(original.uid)}
              className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              <FormattedMessage id={messages.addSubsystem} />
            </button>
          </DropdownMenuItem>

          {canEdit && (
            <DropdownMenuItem
              onClick={handleDelete}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <FormattedMessage id={messages.deleteSystem} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
