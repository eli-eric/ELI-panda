import { Fragment, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/inputs'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import useSystemEditFormFields from '../form/SystemForm.fields'

const messages = message.systemsPage
const messageButtons = message.common.buttons

export const SetMinimalSparesButton = () => {
  const [open, setOpen] = useState(false)
  const fields = useSystemEditFormFields()

  const buttons: ModalButtons = {
    goNext: {
      text: messageButtons.save,
      onClick: () => {
        setOpen(false)
      }
    },
    goBack: {
      text: messageButtons.cancel,
      onClick: () => setOpen(false)
    }
  }

  const handleOpen = () => setOpen(true)
  return (
    <Fragment>
      <Button primary onClick={handleOpen}>
        Set
      </Button>
      <ModalComponent buttons={buttons} open={open} setOpen={setOpen}>
        <div className="flex items-center">
          <label className="font-bold mr-2 text-gray-600 dark:text-gray-200">
            <FormattedMessage
              id={messages.systemDetail.form.minimalSpareParstCount.label}
            />
          </label>
          <Input
            {...fields.minimalSpareParstCount}
            className="w-24"
            autoFocus={true}
          />
        </div>
        <Paragraph
          message={messages.systemDetail.minimalSparePartsModal.message}
        />
      </ModalComponent>
    </Fragment>
  )
}
