import { PlusButton } from '@/components/Buttons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useContactHallModal } from './hooks/useContactHallModal'

interface Props {
    roomCardUid?: string
}

export const ContactHallButton = ({ roomCardUid }: Props) => {
    const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
    const openContactHallModal = useContactHallModal(roomCardUid)

    if (!canEdit) return null

    if (!roomCardUid) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>
                        <PlusButton type="button" disabled />
                    </span>
                </TooltipTrigger>
                <TooltipContent>Save the Room Card first to add contacts</TooltipContent>
            </Tooltip>
        )
    }

    return <PlusButton type="button" onClick={openContactHallModal} />
}
