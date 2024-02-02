import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import Listbox from '@/components/form/Listbox'
import { Modal } from '@/components/overlays/modal/modal.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, ModalButtons, Option } from '@/types/form'
import { classNames } from '@/utils'

const messages = message.common.buttons

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
      text: messages.continue,
      disabled: !selectedSystem,
      onClick: () => {
        setValue('parentSystem', selectedSystem)
        onChange?.(selectedSystem)
        setOpen(false)
      }
    },
    goBack: {
      text: messages.cancel,
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
        <SystemsTable
          tableId={'systemSelect'}
          hideButtons={true}
          className={'overflow-y-auto relative h-[423px]'}
          settings={{
            enableRowSelection: true
          }}
          getRowProps={row => ({
            onClick: () => {
              setSelectedSystem({ name: row.original.name, uid: row.original.uid })
            },
            className: classNames(selectedSystem?.uid === row.original.uid ? 'bg-primary-200' : '', 'cursor-pointer')
          })}
        />
      </Modal>
    </Fragment>
  )
}
