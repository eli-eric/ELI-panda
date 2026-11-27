import { MoreVertical, Move, Package, SlidersHorizontal, Wrench } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePermission } from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { openItemAssignModal } from '@/modules/shared/form/itemAssign/item-assign.modal'
import { openItemMoveModal } from '@/modules/shared/form/itemMoving/item-move.modal'
import { useAssignSparesNavigation } from '@/modules/shared/hooks/useAssignSparesNavigation'
import type { SystemDetail } from '@/modules/shared/system/system-detail'
import { ROLE } from '@/types/constants/roles'

import { openSetMinimalSparesModal } from './set-minimal-spares.modal'

interface ActionsDropdownProps {
    system: SystemDetail
}

export const ActionsDropdown: FC<ActionsDropdownProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    // role gate only — responsibility is a soft lock confirmed inside each write
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])
    const hasPhysicalItem = !!system.physicalItem

    const handleAssignSpares = useAssignSparesNavigation({
        uid: system.uid,
        parentPath: system.parentPath,
        catalogueNumber: system.physicalItem?.catalogueItem?.catalogueNumber ?? null,
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid={`actions-${system.uid}`}>
                {hasPhysicalItem && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={!canEdit}
                        onClick={() => openItemMoveModal(system)}
                    >
                        <Move className="h-4 w-4 mr-2" />
                        {fm({ id: message.systemHierarchy.detail.moveItem })}
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={!canEdit}
                    onClick={handleAssignSpares}
                >
                    <Wrench className="h-4 w-4 mr-2" />
                    {fm({ id: message.systemHierarchy.detail.assignSpares })}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={!canEdit}
                    onClick={() =>
                        openSetMinimalSparesModal({
                            system,
                            title: fm({ id: message.systemHierarchy.detail.setMinimalSpares }),
                            currentValue: system.minimalSpareParstCount,
                        })
                    }
                >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    {fm({ id: message.systemHierarchy.detail.setMinimalSpares })}
                </DropdownMenuItem>
                {!hasPhysicalItem && (
                    <DropdownMenuItem
                        className="cursor-pointer"
                        disabled={!canEdit}
                        onClick={() => openItemAssignModal(system)}
                    >
                        <Package className="h-4 w-4 mr-2" />
                        {fm({ id: message.systemHierarchy.detail.assignItem })}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
