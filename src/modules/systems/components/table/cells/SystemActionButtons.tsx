import Link from 'next/link'

import {
  TableActionsButtons,
  TableButtonsWrapper,
  TableDeleteButton,
  TableEditButton,
  TableOpenButton,
  TablePlusButton
} from '@/components/Buttons'
import { GraphModalTableButton } from '@/modules/shared/system/GraphModalButton'
import { useSystemDelete } from '@/modules/systems/hooks/useSystemDelete'
import { ShowSpareButton } from '@/modules/systemsSpareParts/components/ShowSpareButton'
import { PATH } from '@/types/constants/paths'
import type { SystemDetail } from '@/types/responses/systems'
import type { EndpointProps } from '@/utils/getEndpoints'

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
  const { deleteSystem } = useSystemDelete({
    system: original,
    queryKey
  })

  const handleDelete = () => {
    deleteSystem()
  }
  return (
    <>
      {!hideButtons && (
        <>
          {enableDragAndDrop ? (
            <TableButtonsWrapper>
              <Link href={PATH.SYSTEM + '/' + original.uid} target="_blank">
                {canEdit ? <TableEditButton /> : <TableOpenButton />}
              </Link>
              <TableDeleteButton onClick={handleDelete} />
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
              onDeleteClick={handleDelete}
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
