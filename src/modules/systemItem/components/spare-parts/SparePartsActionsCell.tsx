import type { CellContext } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { TableDeleteButton } from '@/components/Buttons'
import { Button } from '@/components/ui/button'
import { isFeatureEnabled } from '@/config/featureFlags'
import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useSpareDialog } from '@/modules/shared/system/use-spare/useSpareDialog'
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
        original: { node },
    },
}: CellContext<SystemInterfaceSparePartsRelationship, string>) => {
    const { systemDetail, refetch } = useSystemDetail()
    const router = useRouter()
    const openUseSpare = useSpareDialog()
    const [recalculate] = useRecalculate({
        onSuccess: () => {
            refetch()
            toast.success('Spare part deleted successfully')
        },
    })
    const { formatMessage: fm } = useIntl()

    const handleUseSpare = (spareItemUid: string, systemUid: string) => {
        return () => {
            openUseSpare({
                systemUid,
                spareItemUid,
                onSuccess: () => router.reload(),
            })
        }
    }

    const withWarningModal = useWarningModal(
        'Make sure you have a saved changes before deleting related spare part. Page will be reloaded after this action. Are you sure you want to continue?',
    )

    const { mutate } = useGraphQLMutation(DELETE_SPARE_PART, {
        onSuccess: () => {
            recalculate(null)
        },
        onError: () => {
            toast.error('Something went wrong with delete spare part!')
        },
    })

    const submitDelete = () => {
        mutate({
            disconnect: {
                spareParts: [
                    {
                        where: {
                            node: {
                                uid: node.uid,
                            },
                        },
                    },
                ],
            },
            where: {
                uid: systemDetail?.uid,
            },
        })
    }

    const handleDelete = () => {
        withWarningModal(submitDelete)()
    }

    return (
        <div className="flex align-middle justify-center items-center">
            <Button
                onClick={handleUseSpare(node.physicalItem?.uid || '', systemDetail?.uid || '')}
                className="text-[9px] h-5 w-8"
                size="sm"
                disabled={!isFeatureEnabled('enableSparePartsAssignment')}
            >
                {fm({ id: message.common.systemOverlay.useSpare })}
            </Button>
            <TableDeleteButton onClick={handleDelete} />
        </div>
    )
}
