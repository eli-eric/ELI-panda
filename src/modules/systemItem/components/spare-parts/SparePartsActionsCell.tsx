import type { CellContext } from '@tanstack/react-table'
import { toast } from 'sonner'

import { TableDeleteButton } from '@/components/Buttons'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import useWarningModal from '@/hooks/useWarningModal'
import { gql } from '@/types/gql'
import type { SystemInterfaceSparePartsRelationship } from '@/types/gql/graphql'

import { useRecalculate } from '../../hooks/useRecalculate'
import { useSystemDetail } from '../../hooks/useSystemDetail'

const DELETE_SPARE_PART = gql(`
mutation UpdateSystems($disconnect: SystemDisconnectInput, $where: SystemWhere) {
  updateSystems(disconnect: $disconnect, where: $where) {
    systems {
      sparePartsConnection {
        edges {
          coverage
          node {
            name
            parentPath {
              name 
              uid 
            }
            location {
              code
              name
            }
          }
        }
      }
    }
  }
}`)

export const SparePartsActionsCell = ({
  row: {
    original: { node }
  }
}: CellContext<SystemInterfaceSparePartsRelationship, string>) => {
  const { systemDetail, refetch } = useSystemDetail()
  const [recalculate] = useRecalculate({
    onSuccess: () => {
      refetch()
      toast.success('Spare part deleted successfully')
    }
  })

  const withWarningModal = useWarningModal(
    'Make sure you have a saved changes before deleting related spare part. Page will be reloaded after this action. Are you sure you want to continue?'
  )

  const { mutate } = useGraphQLMutation(DELETE_SPARE_PART, {
    onSuccess: () => {
      recalculate(null)
    },
    onError: () => {
      toast.error('Something went wrong with delete spare part!')
    }
  })

  const submitDelete = () => {
    mutate({
      disconnect: {
        spareParts: [
          {
            where: {
              node: {
                uid: node.uid
              }
            }
          }
        ]
      },
      where: {
        uid: systemDetail?.uid
      }
    })
  }

  const handleDelete = () => {
    withWarningModal(submitDelete)()
  }

  return (
    <div className="flex align-middle">
      <TableDeleteButton onClick={handleDelete} />
    </div>
  )
}
