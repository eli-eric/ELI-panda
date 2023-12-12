import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import { useLocationModal } from '@/modules/shared/form/location/hooks/useLocationModal'

export const AddLocationButton = () => {
  const { control } = useFormContext()
  const { append } = useFieldArray({ control, name: 'locations' })
  const { additionalColumn, codebooktree, fetchChildren, loading, open, setOpen, tableId } = useLocationModal()

  const addLocation = (item?: Codebooktree) => {
    if (item) {
      append(item)
    }
  }

  return (
    <Fragment>
      <PlusButton
        primary
        buttonSize="large"
        type="button"
        onClick={() => {
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
        customSetValue={addLocation}
      />
    </Fragment>
  )
}
