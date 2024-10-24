import { FolderPlusIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import { type FC, type HTMLAttributes, type PropsWithChildren } from 'react'
import { FormattedMessage } from 'react-intl'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'

const messages = message.systemItem.itemMove.buttons
const commonButton = message.common.buttons
const NextButton: FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      type="button"
      className="relative block w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  )
}

export const InitWizardPath: FC = () => {
  const { setOpen, setIsMovingToNewSystem } = useModalWizardStore()
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
          <NextButton onClick={goToSystemDetail}>
            <FolderPlusIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300" />
            <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
              <FormattedMessage id={messages.createNewSystem} />
            </span>
          </NextButton>
          <h3 className="text-gray-900 dark:text-gray-200 text-md">OR</h3>
          <NextButton onClick={goToDestinationSystem}>
            <RectangleGroupIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300" />
            <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-200">
              <FormattedMessage id={messages.destionationSystem} />
            </span>
          </NextButton>
        </div>
      </div>
      <ModalButtonsComponent buttons={buttons} />
    </div>
  )
}
