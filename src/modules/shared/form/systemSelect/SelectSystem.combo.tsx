import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { ModalSelect } from '@/components/form/ModalSelect'
import { Modal } from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, ModalButtons, Option } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import { cx } from '@/utils'

const messages = message.common.buttons

export const SelectSystemComboBox = ({
  selectSystemField,
  className,
  onChange,
  isFilter = false
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
  const [selectedSystem, setSelectedSystem] = useState<CodebookType | null>(
    null
  )
  const { setValue } = useFormContext()

  const buttons: ModalButtons = {
    goNext: {
      text: messages.continue,
      disabled: !selectedSystem,
      onClick: () => {
        setValue(selectSystemField.name, selectedSystem)
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
      <ModalSelect
        {...selectSystemField}
        className={className}
        onChange={onChange}
        onClick={() => {
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
              setSelectedSystem({
                name: row.original.name,
                uid: row.original.uid
              })
            },
            className: cx(
              selectedSystem?.uid === row.original.uid
                ? 'bg-primary-200 hover:bg-primary-200 dark:bg-primary-600 dark:hover:bg-primary-600'
                : '',
              'cursor-pointer'
            )
          })}
        />
      </Modal>
    </Fragment>
  )
}
