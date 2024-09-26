import { Fragment, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/inputs'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import useSystemEditFormFields from '../form/SystemForm.fields'

const messages = message.systemsPage
const messageButtons = message.common.buttons

export const SetMinimalSparesButton = () => {
  const [open, setOpen] = useState(false)
  const fields = useSystemEditFormFields()
  const { systemDetail } = useSystemDetail()

  const [minValue, setMinValue] = useState(systemDetail?.minimalSpareParstCount)

  const { setValue, control } = useFormContext()

  const formValue = useWatch({ control, name: 'minimalSpareParstCount' })

  const buttons: ModalButtons = {
    goNext: {
      text: messageButtons.save,
      onClick: () => {
        setOpen(false)
        setMinValue(formValue)
      }
    },
    goBack: {
      text: messageButtons.cancel,
      onClick: () => {
        setValue('minimalSpareParstCount', minValue)
        setOpen(false)
      }
    }
  }

  const handleOpen = () => setOpen(true)
  return (
    <Fragment>
      <Button primary onClick={handleOpen}>
        <FormattedMessage id={messages.systemDetail.spareParts.buttons.set} />
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
            type="number"
            className="w-24"
          />
        </div>
        <Paragraph
          message={messages.systemDetail.minimalSparePartsModal.message}
        />
      </ModalComponent>
    </Fragment>
  )
}
