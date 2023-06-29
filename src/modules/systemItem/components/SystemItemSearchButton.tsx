import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { SystemDetail } from '@/modules/systems/types/responses'
import type { ModalButtons } from '@/types/form'

const messages = message.common.buttons

export const SystemItemSearchButton = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<SystemDetail>()
  const { setValue, watch } = useFormContext()
  const intl = useIntl()
  const physicalItem = watch('physicalItem')

  const modalButtons: ModalButtons = {
    goNext: {
      text: intl.formatMessage({ id: messages.continue }),
      onClick: () => {
        setValue('physicalItem', selectedSystem?.physicalItem)
        setValue('name', selectedSystem?.name)
        setOpenModal(false)
      }
    },
    goBack: {
      text: intl.formatMessage({ id: messages.cancel }),
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
