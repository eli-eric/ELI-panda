import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { ModalSelect } from '@/components/form/ModalSelect'
import { openCodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CodebookType } from '@/types/responses/codebook'

import { useLocationModal } from './hooks/useLocationModal'

export const SelectLocationCombo = ({
  locationField,
  className,
  disabled,
  onSelect,
  isFilter = false
}: {
  locationField: any
  disabled?: boolean
  className?: string
  onSelect?: (item?: CodebookType | null) => void
  isFilter?: boolean
}) => {
  const {
    additionalColumn,
    codebooktree,
    fetchChildren,
    loading,
    error,
    tableId
  } = useLocationModal()

  // Handle error with useEffect to prevent infinite loops
  useEffect(() => {
    if (error) {
      toast.error('Failed to load locations')
    }
  }, [error])

  const handleOpenModal = () => {
    openCodebookTreeModalGraphql({
      fetchChildren,
      onSelect,
      tableId,
      additionalColumn,
      data: codebooktree,
      loading,
      manualFiltering: true,
      enableFiltering: true,
      name: locationField.name
    })
  }

  return (
    <ModalSelect
      {...locationField}
      onSelect={onSelect}
      className={className}
      disabled={disabled}
      onClick={handleOpenModal}
      isFilter={isFilter}
    />
  )
}
