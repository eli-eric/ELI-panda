import { PlusButton } from '@/components/Buttons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useTeamModal } from './hooks/useTeamModal'

interface Props {
    roomCardUid?: string
}

export const TeamButton = ({ roomCardUid }: Props) => {
    const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
    const openTeamModal = useTeamModal(roomCardUid)

    if (!canEdit) return null

    if (!roomCardUid) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>
                        <PlusButton type="button" disabled />
                    </span>
                </TooltipTrigger>
                <TooltipContent>Save the Room Card first to add teams</TooltipContent>
            </Tooltip>
        )
    }

    return <PlusButton type="button" onClick={openTeamModal} />
}
