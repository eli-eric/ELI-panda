import { FolderPlusIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { type FC } from 'react'
import { FormattedMessage } from 'react-intl'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
import { InitWizardButton } from './components/InitWizard.btn'

const messages = message.systemItem.itemMove.buttons
const commonButton = message.common.buttons

export const InitWizardPath: FC = () => {
  const { setOpen, setIsMovingToNewSystem, setSelectedSystem } =
    useModalWizardStore()
  const { goNext, resetWizard } = useWizardStore()

  const goToDestinationSystem = () => {
    goNext()
    setIsMovingToNewSystem(false)
  }
  const goToSystemDetail = () => {
    goNext()
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
          Please select or create a system to move the item to. If you already
          have a system, you can select it. If you dont have a system, you can
          create a new one.
        </p>
        <div className="flex space-x-10 items-center">
          <InitWizardButton onClick={goToSystemDetail}>
            <FolderPlusIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300" />
            <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
              <FormattedMessage id={messages.createNewSystem} />
            </span>
          </InitWizardButton>
          <h3 className="text-gray-900 dark:text-gray-200 text-md">OR</h3>
          <InitWizardButton onClick={goToDestinationSystem}>
            <RectangleGroupIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300" />
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
