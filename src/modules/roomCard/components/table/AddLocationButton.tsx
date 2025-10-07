import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PlusButton } from '@/components/Buttons'
import { useLocationSelectionModal } from '@/modules/shared/form/location/hooks/useLocationSelectionModal'
import type { CodebookType } from '@/types/responses/codebook'

import { useRoomCardStore } from '../../store/useRoomCardStore'

export const AddLocationButton = () => {
  const { control } = useFormContext()
  const { append, fields } = useFieldArray({ control, name: 'locations' })
  const { openLocationModal } = useLocationSelectionModal()
  const { setNewLocation } = useRoomCardStore()

  const addLocation = (item?: CodebookType | null) => {
    if (item) {
      if (fields.find((field: any) => field.uid === item.uid)) {
        toast.error('Location already exists')
        return
      }
      append(item)
      setNewLocation(item)
    }
  }

  const handleOpenLocationModal = () => {
    openLocationModal(addLocation)
  }

  return (
    <Fragment>
      <PlusButton type="button" onClick={handleOpenLocationModal} />
    </Fragment>
  )
}
