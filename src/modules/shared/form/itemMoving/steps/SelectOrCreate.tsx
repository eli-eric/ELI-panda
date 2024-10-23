import type { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'

import { useItemWizardStore } from '../store/useItemWizardState'

const messages = message.systemItem.itemMove.buttons

export const SelectOrCreate: FC = () => {
  const { setStep, setForbidenStep } = useItemWizardStore()

  const goToDestinationSystem = () => {
    setForbidenStep(null)
    setStep(2)
  }

  const goToSystemDetail = () => {
    setForbidenStep(2)
    setStep(3)
  }

  return (
    <div className="flex justify-center">
      <div className="flex space-x-10 items-center whitespace-nowrap h-10">
        <Button primary onClick={goToDestinationSystem}>
          <FormattedMessage id={messages.destionationSystem} />
        </Button>
        <h3>OR</h3>
        <Button primary onClick={goToSystemDetail}>
          <FormattedMessage id={messages.createNewSystem} />
        </Button>
      </div>
    </div>
  )
}
