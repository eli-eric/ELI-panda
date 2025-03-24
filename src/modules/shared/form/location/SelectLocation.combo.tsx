import { Fragment, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { ModalSelect } from '@/components/form/ModalSelect'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
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
    open,
    setOpen,
    tableId
  } = useLocationModal()

  // Handle error with useEffect to prevent infinite loops
  useEffect(() => {
    if (error && open) {
      toast.error('Failed to load locations')
      setOpen(false)
    }
  }, [error, open, setOpen])

  return (
    <Fragment>
      <ModalSelect
        {...locationField}
        onSelect={onSelect}
        className={className}
        disabled={disabled}
        onClick={() => {
          setOpen(true)
        }}
        isFilter={isFilter}
      />
      <CodebookTreeModalGraphql
        fetchChildren={fetchChildren}
        onSelect={onSelect}
        tableId={tableId}
        additionalColumn={additionalColumn}
        data={codebooktree}
        open={open}
        loading={loading}
        manualFiltering={true}
        enableFiltering={true}
        setOpen={setOpen}
        name={locationField.name}
      />
    </Fragment>
  )
}
