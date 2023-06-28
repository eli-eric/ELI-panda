import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'

import { PlusButton } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { ModalButtons } from '@/types/form'

const messages = message.common.buttons

export const SystemItemSearchButton = () => {
  const [openModal, setOpenModal] = useState(false)
  const intl = useIntl()

  const modalButtons: ModalButtons = {
    goNext: {
      text: intl.formatMessage({ id: messages.continue }),
      onClick: () => {
        console.log('submit')
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
      <PlusButton
        primary
        buttonSize="large"
        onClick={() => {
          setOpenModal(true)
          console.log('open modal')
        }}
      />
      <ModalComponent open={openModal} setOpen={setOpenModal} buttons={modalButtons}>
        <div className="relative min-h-[560px] max-h-[541px]">
          <SystemsTable
            tableId={'systems'}
            enableQueryURL={false}
            pageSizeDefault={10}
            className={'overflow-auto'}
            hideButtons
          />
        </div>
      </ModalComponent>
    </Fragment>
  )
}
