import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { DeleteButton, DetailButton, EditButton, PlusButton } from '@/components/Buttons'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { SystemDetail } from '@/modules/systems/types/responses'
import { PATH } from '@/types/constants/paths'

const messages = message.systemsPage.systemDetail.deleteModal

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  setUid: (uid: string) => void
  canEdit?: boolean
  hideButtons?: boolean
}

export const SystemNameCell = ({ row, getValue, setUid, canEdit = true, hideButtons = false }: SystemNameCellProps) => {
  const { system } = useEndpoint({ uid: row.original.uid })
  const { formatMessage: fm } = useIntl()

  const { submit } = useSubmit<string>({
    endpoint: system,
    method: 'delete',
    onSuccess: () => {
      toast.success(`System ${row.original.name} deleted`)
    },
    onError: () => {
      toast.error(`Error deleting system ${row.original.name}`)
    }
  })

  const withWarningModal = useWarningModal(
    fm({ id: messages.message }, createMessageValues({ name: row.original.name }))
  )

  return (
    <div
      style={{
        paddingLeft: `${row.depth * 2}rem`
      }}
    >
      <div className="flex items-center">
        {row.original.hasSubsystems ? (
          <button
            onClick={() => {
              if (!row.getIsExpanded()) {
                setUid(row.original.uid)
              }
              row.toggleExpanded()
            }}
            style={{ cursor: 'pointer' }}
            className="flex items-center hover:text-gray-400"
          >
            {row.getIsExpanded() ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
            <span className="pl-1 my-1">{getValue()}</span>
          </button>
        ) : (
          <span className="pl-5 my-1">{getValue()}</span>
        )}
        {!hideButtons && (
          <Fragment>
            <Link href={PATH.SYSTEM + '/' + row.original.uid} className="ml-auto z-0">
              <Fragment>{canEdit ? <EditButton /> : <DetailButton />}</Fragment>
            </Link>
            {canEdit && (
              <DeleteButton
                className="ml-2 z-0"
                onClick={() => {
                  withWarningModal(submit)()
                }}
              />
            )}
            {canEdit && (
              <Link href={{ pathname: PATH.SYSTEM, query: { parentUid: row.original.uid } }} className="ml-2 z-0">
                <PlusButton />
              </Link>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}
