import { useIntl } from 'react-intl'

import { PlusButton } from '@/components/Buttons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { useContactHallModal } from './hooks/useContactHallModal'

interface Props {
    roomCardUid?: string
}

export const ContactHallButton = ({ roomCardUid }: Props) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.roomCardsPage.table
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
                <TooltipContent>{fm({ id: labels.saveFirstAddContacts })}</TooltipContent>
            </Tooltip>
        )
    }

    return <PlusButton type="button" onClick={openContactHallModal} />
}
