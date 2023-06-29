import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { SystemDetail } from '@/modules/systems/types/responses'
import type { ModalButtons } from '@/types/form'

const messages = message.common.buttons

export const AssignPhysicalItem = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<SystemDetail>()
  const { setValue, watch } = useFormContext()
  const physicalItem = watch('physicalItem')

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.continue,
      onClick: () => {
        if (selectedSystem?.physicalItem) {
          setValue('physicalItem', selectedSystem?.physicalItem, { shouldDirty: true })
          setValue('name', selectedSystem?.name, { shouldDirty: true })
        } else {
          setValue('physicalItem', { catalogueItem: {} }, { shouldDirty: true })
        }
        setOpenModal(false)
      }
    },
    goBack: {
      text: messages.cancel,
      onClick: () => {
        setOpenModal(false)
      }
    }
  }

  return (
    <Fragment>
      <Button
        primary
        buttonSize="large"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        {physicalItem ? 'Change Physical Item' : 'Assign Physical Item'}
      </Button>
      <ModalComponent open={openModal} setOpen={setOpenModal} buttons={modalButtons}>
        <SystemsTable
          tableId={'systemsItem'}
          settings={{ enableQueryURL: false }}
          pageSizeDefault={10}
          className={'overflow-y-auto relative h-[423px]'}
          getRowProps={row => ({
            onClick: () => {
              setSelectedSystem(row.original)
            },
            className: classNames(
              selectedSystem?.uid === row.original.uid ? 'bg-primary-200 hover:bg-primary-200' : '',
              'cursor-pointer'
            )
          })}
          hideButtons
        />
      </ModalComponent>
    </Fragment>
  )
}
