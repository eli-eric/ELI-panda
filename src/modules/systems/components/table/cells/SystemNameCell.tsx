import { ChevronDownIcon, ChevronRightIcon, PaperClipIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { TableActionsButtons } from '@/components/Buttons'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useSystems } from '@/modules/systems/hooks/useSystems'
// eslint-disable-next-line
import { SystemsContext } from '@/modules/systems/Systems.cont'
import type { SystemDetail } from '@/modules/systems/types/responses'
import { filterSubsystem } from '@/modules/systems/utils'
import { PATH } from '@/types/constants/paths'

const messages = message.systemsPage.systemDetail.deleteModal

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  setUid: (uid: string | null) => void
  canEdit?: boolean
  hideButtons?: boolean
  tableId: string
  isHoveringId?: number | undefined | string
}

export const SystemNameCell = ({
  row,
  getValue,
  setUid,
  canEdit = true,
  hideButtons = false,
  tableId
}: SystemNameCellProps) => {
  const { original, id } = row
  const { system } = useEndpoint({ uid: original.uid })
  const { isHoveringId } = useContext(SystemsContext)
  const { mutate } = useSystems(tableId)
  const { formatMessage: fm } = useIntl()

  const { submit } = useSubmit<string>({
    endpoint: system,
    method: 'delete',
    onSuccess: () => {
      toast.success(`System ${original.name} deleted`)
      mutate(prev => prev && filterSubsystem(original.uid, prev), { revalidate: false })
    },
    onError: () => {
      toast.error(`Error deleting system ${original.name}`)
    }
  })

  const withWarningModal = useWarningModal(fm({ id: messages.message }, createMessageValues({ name: original.name })))

  return (
    <div
      style={{
        paddingLeft: `${row.depth * 2}rem`
      }}
    >
      <div className="flex items-center">
        {original.hasSubsystems ? (
          <button
            onClick={() => {
              if (!row.getIsExpanded()) {
                setUid(original.uid)
              } else {
                setUid(null)
              }
              row.toggleExpanded()
            }}
            className="flex items-center hover:text-gray-400 cursor-pointer"
          >
            {row.getIsExpanded() ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
            <span className="pl-1 my-1">{getValue()}</span>
          </button>
        ) : (
          <div className="flex items-center">
            {original.physicalItem && <PaperClipIcon className="w-4 h-4" />}
            <span className="pl-5 my-1">{getValue()}</span>
          </div>
        )}
        {!hideButtons && (isHoveringId === id || isMobile) && (
          <TableActionsButtons
            onDeleteClick={() => {
              withWarningModal(submit)()
            }}
            addLink={{ pathname: PATH.SYSTEM, query: { parentUid: original.uid } }}
            detailLink={PATH.SYSTEM + '/' + original.uid}
            canEdit={canEdit}
          />
        )}
      </div>
    </div>
  )
}
