import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { isFeatureEnabled } from '@/config/featureFlags'
import { message } from '@/i18n/src/messages'
import { SpareRelationshipDeleteButton } from '@/modules/shared/system/use-spare/components/spare-relationship-delete-button.comp'
import { useSpareDialog } from '@/modules/shared/system/use-spare/useSpareDialog'

import type { SparePartEdge } from './SparePartsTab.types'

interface Props {
    node: SparePartEdge['node']
    currentSystemUid: string
    canEdit: boolean
}

const messages = message.common.spareAssignment

export const SparePartActions: FC<Props> = ({ node, currentSystemUid, canEdit }) => {
    const { formatMessage: fm } = useIntl()
    const openUseSpare = useSpareDialog()
    const physicalItemUid = node.physicalItem?.uid ?? null

    const featureOff = !isFeatureEnabled('enableSparePartsAssignment')
    const useDisabledTooltipId = !canEdit
        ? messages.noPermissionTooltip
        : featureOff
          ? messages.useSpareDisabledTooltip
          : !physicalItemUid
            ? messages.noPhysicalItemTooltip
            : messages.useSpareTooltip
    const useDisabled = !canEdit || featureOff || !physicalItemUid

    const handleUseSpare = () => {
        if (useDisabled || !physicalItemUid) return
        openUseSpare({ systemUid: currentSystemUid, spareItemUid: physicalItemUid })
    }

    return (
        <div
            className="flex items-center gap-1 shrink-0"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            role="presentation"
        >
            <Tooltip content={fm({ id: useDisabledTooltipId })}>
                <Button
                    type="button"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    disabled={useDisabled}
                    onClick={handleUseSpare}
                >
                    {fm({ id: messages.useSpare })}
                </Button>
            </Tooltip>
            <SpareRelationshipDeleteButton
                currentSystemUid={currentSystemUid}
                relatedSystemUid={node.uid}
                direction="inbound"
                canEdit={canEdit}
            />
        </div>
    )
}
