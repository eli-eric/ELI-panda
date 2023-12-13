import { Fragment } from 'react'

import Combobox from '@/components/form/Combobox'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'

import { useLocationModal } from './hooks/useLocationModal'

export const SelectLocationTree = ({
  locationField,
  className
}: {
  locationField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
}) => {
  const { additionalColumn, codebooktree, fetchChildren, loading, open, setOpen, tableId } = useLocationModal()

  return (
    <Fragment>
      <Combobox
        {...locationField}
        className={className}
        onClickIcon={() => {
          setOpen(true)
        }}
      />
      <CodebookTreeModalGraphql
        fetchChildren={fetchChildren}
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
