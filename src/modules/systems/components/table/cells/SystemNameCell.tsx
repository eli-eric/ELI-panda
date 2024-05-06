import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import classNames from 'classnames'
import Link from 'next/link'
import { Fragment } from 'react'
import { useDrag } from 'react-dnd'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import {
  TableActionsButtons,
  TableButtonsWrapper,
  TableDeleteButton,
  TableEditButton,
  TableOpenButton,
  TablePlusButton
} from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useSystems } from '@/modules/systems/hooks/useSystems'
// eslint-disable-next-line
import type {
  SystemDetail,
  SystemsResponse
} from '@/modules/systems/types/responses'
import { filterSubsystem } from '@/modules/systems/utils'
import { ShowSpareButton } from '@/modules/systemsSpareParts/components/ShowSpareButton'
import { PATH } from '@/types/constants/paths'
import { createMessageValues } from '@/utils/formatters'
import { useQueryClient } from '@tanstack/react-query'

const messages = message.systemsPage.systemDetail.deleteModal

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  setUid: (uid: string | null) => void
  canEdit?: boolean
  hideButtons?: boolean
  tableId: string
  isHoveringId?: number | undefined | string

  enableDragAndDrop?: boolean
}

export const SystemNameCell = ({
  row,
  getValue,
  setUid,
  canEdit = true,
  hideButtons = false,
  tableId,
  enableDragAndDrop = false
}: SystemNameCellProps) => {
  const { original } = row
  const { sparesIn, sparesOut } = original
  const { system } = useEndpoint({ uid: original.uid })
  const { queryKey } = useSystems(tableId)

  const queryClient = useQueryClient()

  const { formatMessage: fm } = useIntl()

  const { submit } = useSubmit<string>({
    endpoint: system,
    method: 'delete',
    onSuccess: () => {
      toast.success(`System ${original.name} deleted`)

      queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
        if (prev) {
          return filterSubsystem(original.uid, prev)
        }
        return prev
      })
    },
    onError: () => {
      toast.error(`Error deleting system ${original.name}`)
    }
  })

  const withWarningModal = useWarningModal(
    fm({ id: messages.message }, createMessageValues({ name: original.name }))
  )

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    item: () => ({ ...original, tableId }),
    type: 'system'
  })

  return (
    <div
      style={{
        paddingLeft: `${row.depth * 2}rem`
      }}
      className={classNames(isDragging && 'text-primary-500')}
    >
      <div className="flex items-center" ref={dragRef}>
        <div
          className={classNames(
            'flex items-center w-full py-1',
            original.hasSubsystems && 'group/expand cursor-pointer'
          )}
          onClick={() => {
            if (!row.getIsExpanded()) {
              if (!original.subSystems?.length) {
                setUid(original.uid)
              }
            }
            row.toggleExpanded()
          }}
          ref={previewRef}
        >
          {enableDragAndDrop && (
            <button className="mr-2">
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </button>
          )}
          <Tooltip
            content={original.parentPath?.map(v => v.name).join(' > ')}
            placement="top"
            className={
              original.parentPath && original.parentPath?.length > 0
                ? ''
                : 'hidden'
            }
          >
            <div>
              {original.hasSubsystems ? (
                <div className="flex items-center group-hover/expand:text-gray-400 cursor-pointer">
                  {row.getIsExpanded() ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                  <span className="pl-1">
                    <span>{getValue()}</span>
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="pl-5">
                    <span>{getValue()}</span>
                  </span>
                </div>
              )}
            </div>
          </Tooltip>
        </div>
        {!hideButtons && (
          <Fragment>
            {enableDragAndDrop ? (
              <TableButtonsWrapper>
                <Link href={PATH.SYSTEM + '/' + original.uid} legacyBehavior>
                  <a
                    target={'_blank'}
                    rel="noreferrer"
                    className="flex items-center"
                  >
                    <Fragment>
                      {canEdit ? <TableEditButton /> : <TableOpenButton />}
                    </Fragment>
                  </a>
                </Link>
                <TableDeleteButton
                  onClick={() => {
                    withWarningModal(submit)()
                  }}
                />
                <Link
                  href={{
                    pathname: PATH.SYSTEM,
                    query: { parentUid: original.uid }
                  }}
                  legacyBehavior
                >
                  <a
                    target={'_blank'}
                    rel="noreferrer"
                    className="flex items-center"
                  >
                    <TablePlusButton />
                  </a>
                </Link>
              </TableButtonsWrapper>
            ) : (
              <TableActionsButtons
                onDeleteClick={() => {
                  withWarningModal(submit)()
                }}
                addLink={{
                  pathname: PATH.SYSTEM,
                  query: { parentUid: original.uid }
                }}
                detailLink={PATH.SYSTEM + '/' + original.uid}
                canEdit={canEdit}
              >
                <ShowSpareButton
                  tableId={tableId}
                  uid={original.uid}
                  sparesIn={sparesIn}
                  sparesOut={sparesOut}
                />
              </TableActionsButtons>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}
