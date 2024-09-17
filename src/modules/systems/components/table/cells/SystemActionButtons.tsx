import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useIntl } from 'react-intl'

import {
  TableActionsButtons,
  TableButtonsWrapper,
  TableDeleteButton,
  TableEditButton,
  TableOpenButton,
  TablePlusButton
} from '@/components/Buttons'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { GraphModalTableButton } from '@/modules/shared/system/GraphModalButton'
import { filterSubsystem } from '@/modules/systems/utils'
import { ShowSpareButton } from '@/modules/systemsSpareParts/components/ShowSpareButton'
import { PATH } from '@/types/constants/paths'
import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'
import { createMessageValues } from '@/utils/formatters'
import type { EndpointProps } from '@/utils/getEndpoints'

const messages = message.systemsPage.systemDetail.deleteModal

interface Props {
  hideButtons?: boolean
  enableDragAndDrop?: boolean
  tableId: string
  original: SystemDetail
  sparesIn?: number
  sparesOut?: number
  canEdit: boolean
  queryKey?: [string, EndpointProps]
}

export const SystemActionButtons = ({
  hideButtons,
  enableDragAndDrop,
  tableId,
  original,
  sparesIn,
  sparesOut,
  canEdit,
  queryKey
}: Props) => {
  const { system } = useEndpoint({ uid: original.uid })

  const queryClient = useQueryClient()

  const { formatMessage: fm } = useIntl()
  const { submit } = useSubmit<string>({
    endpoint: system,
    method: 'delete',
    onSuccess: () => {
      toast.success(`System ${original.name} deleted`)
      if (queryKey) {
        queryClient.setQueryData<SystemsResponse>(queryKey, prev => {
          if (prev) {
            return filterSubsystem(original.uid, prev)
          }
          return prev
        })
      }
    },
    onError: () => {
      toast.error(`Error deleting system ${original.name}`)
    }
  })
  const withWarningModal = useWarningModal(
    fm({ id: messages.message }, createMessageValues({ name: original.name }))
  )
  return (
    <>
      {!hideButtons && (
        <>
          {enableDragAndDrop ? (
            <TableButtonsWrapper>
              <Link href={PATH.SYSTEM + '/' + original.uid} target="_blank">
                {canEdit ? <TableEditButton /> : <TableOpenButton />}
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
              <GraphModalTableButton uid={original.uid} />
            </TableActionsButtons>
          )}
        </>
      )}
    </>
  )
}
