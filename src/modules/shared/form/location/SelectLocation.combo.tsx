import { Fragment } from 'react'

import Combobox from '@/components/form/Combobox'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CodebookType } from '@/hooks/fetch/useCodebook'

import { useLocationModal } from './hooks/useLocationModal'

export const SelectLocationCombo = ({
  locationField,
  className,
  onSelect
}: {
  locationField: any
  className?: string
  onSelect?: (item?: CodebookType | null) => void
  isFilter?: boolean
}) => {
  const { additionalColumn, codebooktree, fetchChildren, loading, open, setOpen, tableId } = useLocationModal()

  return (
    <Fragment>
      <Combobox
        {...locationField}
        onSelect={onSelect}
        className={className}
        onClickIcon={() => {
          setOpen(true)
        }}
        isFilter={true}
      />
      <CodebookTreeModalGraphql
        fetchChildren={fetchChildren}
        onSelect={onSelect}
        tableId={tableId}
        additionalColumn={additionalColumn}
        data={codebooktree}
        open={open}
        loading={loading}
        enableFiltering={true}
        setOpen={setOpen}
        name={locationField.name}
      />
    </Fragment>
  )
}
