import { FolderPlus, LayoutGrid } from 'lucide-react'
import { type FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
import { MOVE_TYPE } from '../types/constants'
import { InitWizardButton } from './components/InitWizard.btn'

const messages = message.systemItem.itemMove.buttons
const commonButton = message.common.buttons

export const InitWizardPath: FC = () => {
  const { formatMessage: fm } = useIntl()
  const { setOpen, setSelectedSystem, setMoveType, setIsMovingToNewSystem } =
    useModalWizardStore()

  const { goNext, resetWizard } = useWizardStore()

  const goToDestinationSystem = () => {
    goNext()
    setMoveType(MOVE_TYPE.DESTINATION_SYSTEM)
    setIsMovingToNewSystem(false)
  }

  const goToParentSystem = () => {
    goNext()
    setMoveType(MOVE_TYPE.NEW_SYSTEM)
    setIsMovingToNewSystem(true)
  }

  const handleCancel = () => {
    setOpen(false)
    resetWizard()
    setSelectedSystem(null)
  }

  const buttons: ModalButtons = {
    goNext: {
      text: commonButton.close,
      onClick: handleCancel
    }
  }

  return (
    <div className="flex flex-col justify-between pt-5 h-[523px]">
      <div className="text-center flex flex-col justify-between">
        {/* more complex test what will describe a moving item and next steps */}
        <p className="text-gray-600 dark:text-gray-200 pb-10">
          {fm({ id: message.common.forms.selectOrCreateSystem })}
        </p>
        <div className="flex space-x-10 items-center">
          <InitWizardButton onClick={goToParentSystem}>
            <FolderPlus className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300" />
            <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
              <FormattedMessage id={messages.createNewSystem} />
            </span>
          </InitWizardButton>
          <h3 className="text-gray-900 dark:text-gray-200 text-md">
            {fm({ id: message.common.forms.or })}
          </h3>
          <InitWizardButton onClick={goToDestinationSystem}>
            <LayoutGrid className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300" />
            <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
              <FormattedMessage id={messages.destionationSystem} />
            </span>
          </InitWizardButton>
        </div>
      </div>
      <ModalButtonsComponent buttons={buttons} />
    </div>
  )
}
