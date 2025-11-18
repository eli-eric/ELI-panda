import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Button as UIButton } from '@/components/ui/button'
import { Input as UIInput } from '@/components/ui/input'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemDetail } from '../../hooks/useSystemDetail'

const messages = message.systemsPage
const messageButtons = message.common.buttons

interface SetMinimalSparesModalContentProps {
  currentValue?: number
  onSubmit?: (value: number) => void
  onCancel?: () => void
  modalId?: string
}

let currentMinimalSparesModalId: string | undefined

const SetMinimalSparesModalContent = ({
  currentValue,
  onSubmit,
  onCancel,
  modalId
}: SetMinimalSparesModalContentProps) => {
  const { closeModal } = useDynamicModalStore()
  const [value, setValue] = useState(currentValue || 0)

  const handleOk = () => {
    onSubmit?.(value)
    if (modalId) {
      closeModal(modalId)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    if (modalId) {
      closeModal(modalId)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <label className="font-bold mr-2 text-gray-600 dark:text-gray-200">
          <FormattedMessage
            id={messages.systemDetail.form.minimalSpareParstCount.label}
          />
        </label>
        <UIInput
          type="number"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-24"
        />
      </div>
      <Paragraph
        message={messages.systemDetail.minimalSparePartsModal.message}
      />
      <div className="flex justify-end gap-2">
        <UIButton variant="outline" onClick={handleCancel}>
          <FormattedMessage id={messageButtons.cancel} />
        </UIButton>
        <UIButton onClick={handleOk}>
          <FormattedMessage id={messageButtons.ok} />
        </UIButton>
      </div>
    </div>
  )
}

export const SetMinimalSparesButton = () => {
  const { setValue, getValues } = useFormContext()
  const { systemDetail } = useSystemDetail()

  const openModal = () => {
    if (typeof window === 'undefined') return

    const { openModal } = useDynamicModalStore.getState()
    const currentValue =
      getValues('minimalSpareParstCount') ??
      systemDetail?.minimalSpareParstCount

    currentMinimalSparesModalId = openModal('dialog', {
      id: `set-minimal-spares-${systemDetail?.uid}`,
      component: () => (
        <SetMinimalSparesModalContent
          currentValue={currentValue}
          onSubmit={value => setValue('minimalSpareParstCount', value)}
          onCancel={() => setValue('minimalSpareParstCount', currentValue)}
          modalId={currentMinimalSparesModalId}
        />
      ),
      props: {
        size: 'm' as const
      }
    })
    return currentMinimalSparesModalId
  }

  return (
    <Button onClick={openModal}>
      <FormattedMessage id={messages.systemDetail.spareParts.buttons.set} />
    </Button>
  )
}
