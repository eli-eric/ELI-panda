import { toast } from 'sonner'

import { PlusButton } from '@/components/Buttons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useLocationSelectionModal } from '@/modules/shared/form/location/hooks/useLocationSelectionModal'
import type { CodebookType } from '@/types/responses/codebook'

import { useConnectLocation } from '../../hooks/useContactMutations'
import { useRoomCardLocations } from '../../hooks/useRoomCardContacts'

interface Props {
  roomCardUid?: string
}

export const AddLocationButton = ({ roomCardUid }: Props) => {
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
        <TooltipContent>Save the Room Card first to add locations</TooltipContent>
      </Tooltip>
    )
  }

  const addLocation = async (item?: CodebookType | null) => {
    if (!item) return

    if (locations.some(loc => loc.uid === item.uid)) {
      toast.error('Location already exists')
      return
    }

    try {
      await connectLocation(item.uid)
      toast.success('Location added')
    } catch {
      toast.error('Failed to add location')
    }
  }

  const handleOpenLocationModal = () => {
    openLocationModal(addLocation)
  }

  return (
    <PlusButton
      type="button"
      onClick={handleOpenLocationModal}
      disabled={isPending}
    />
  )
}
