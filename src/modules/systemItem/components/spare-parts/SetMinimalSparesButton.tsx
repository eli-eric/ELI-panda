import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Input } from '@/components/form/inputs'
import { Button as UIButton } from '@/components/ui/button'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import useSystemEditFormFields from '../form/SystemForm.fields'

const messages = message.systemsPage
const messageButtons = message.common.buttons

function openSetMinimalSparesModal() {
  if (typeof window === 'undefined') return // Prevent SSR execution
  
  const { openModal } = useModalGlobalStore.getState()
  
  openModal('dialog1', {
    component: () => <SetMinimalSparesModalContent />,
    props: {
      title: 'Set Minimal Spare Parts',
      size: 'm' as const
    }
  })
}

const SetMinimalSparesModalContent = () => {
  const { closeModal } = useModalGlobalStore()
  const fields = useSystemEditFormFields()
  const { systemDetail } = useSystemDetail()

  const [minValue, setMinValue] = useState(systemDetail?.minimalSpareParstCount)

  const { setValue, control } = useFormContext()
  const formValue = useWatch({ control, name: 'minimalSpareParstCount' })

  const handleOk = () => {
    closeModal('dialog1')
    setMinValue(formValue)
  }

  const handleCancel = () => {
    setValue('minimalSpareParstCount', minValue)
    closeModal('dialog1')
  }

  return (
    <div className="space-y-4">
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
      <div className="flex justify-end gap-2">
        <UIButton variant="outline" onClick={handleCancel}>
          {messageButtons.cancel}
        </UIButton>
        <UIButton onClick={handleOk}>
          {messageButtons.ok}
        </UIButton>
      </div>
    </div>
  )
}

export const SetMinimalSparesButton = () => {
  return (
    <Button onClick={openSetMinimalSparesModal}>
      <FormattedMessage id={messages.systemDetail.spareParts.buttons.set} />
    </Button>
  )
}
