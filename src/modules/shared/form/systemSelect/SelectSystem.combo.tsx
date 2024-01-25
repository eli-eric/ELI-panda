import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import Listbox from '@/components/form/Listbox'
import { Modal } from '@/components/overlays/modal/modal.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, ModalButtons, Option } from '@/types/form'

import { SelectSystemTable } from './components/SelectSystem.table'

export const SelectSystemComboBox = ({
  selectSystemField,
  className,
  onChange,
  isFilter
}: {
  selectSystemField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
  onChange?: (value?: any) => void
  isFilter?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<CodebookType | null>(null)
  const { setValue } = useFormContext()

  const buttons: ModalButtons = {
    goNext: {
      text: 'Continue',
      disabled: !selectedSystem,
      onClick: () => {
        setOpen(false)
        setValue('parentSystem', selectedSystem)
        onChange?.(selectedSystem)
      }
    },
    goBack: {
      text: 'Cancel',
      onClick: () => {
        setOpen(false)
      }
    }
  }

  return (
    <Fragment>
      <Listbox
        {...selectSystemField}
        className={className}
        onChange={onChange}
        onClickIcon={() => {
          setOpen(true)
        }}
        isFilter={isFilter}
      />
      <Modal open={open} setOpen={setOpen} buttons={buttons}>
        <SelectSystemTable
          setSelectedSystem={setSelectedSystem}
          tableId="systemSelect"
          selectedSystem={selectedSystem}
        />
      </Modal>
    </Fragment>
  )
}
