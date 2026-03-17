import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { PlusButton } from '@/components/Buttons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { message } from '@/i18n/src/messages'
import { useLocationSelectionModal } from '@/modules/shared/form/location/hooks/useLocationSelectionModal'
import type { CodebookType } from '@/types/responses/codebook'

import { useConnectLocation } from '../../hooks/useContactMutations'
import { useRoomCardLocations } from '../../hooks/useRoomCardContacts'

interface Props {
    roomCardUid?: string
}

export const AddLocationButton = ({ roomCardUid }: Props) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.roomCardsPage.table
    const { openLocationModal } = useLocationSelectionModal()
    const { connectLocation, isPending } = useConnectLocation(roomCardUid || '')
    const { locations } = useRoomCardLocations(roomCardUid)

    // In create mode (no roomCardUid), show disabled button with tooltip
    if (!roomCardUid) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>
                        <PlusButton type="button" disabled />
                    </span>
                </TooltipTrigger>
                <TooltipContent>{fm({ id: labels.saveFirstAddLocations })}</TooltipContent>
            </Tooltip>
        )
    }

    const addLocation = async (item?: CodebookType | null) => {
        if (!item) return

        if (locations?.some(loc => loc.uid === item.uid)) {
            toast.error(fm({ id: labels.locationExists }))
            return
        }

        toast.promise(connectLocation(item.uid), {
            loading: fm({ id: labels.addingLocation }),
            success: fm({ id: labels.locationAdded }),
            error: fm({ id: labels.locationAddFailed }),
        })
    }

    const handleOpenLocationModal = () => {
        openLocationModal(addLocation)
    }

    return <PlusButton type="button" onClick={handleOpenLocationModal} disabled={isPending} />
}
