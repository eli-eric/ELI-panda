import { FolderPlusIcon, RectangleGroupIcon } from '@heroicons/react/24/outline'
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { Step } from '../constants/steps'
import { useItemWizardStore } from '../store/useItemWizardState'

const messages = message.systemItem.itemMove.buttons

const NextButton: FC<PropsWithChildren<HTMLAttributes<HTMLButtonElement>>> = ({
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  )
}

const stepsDestination: Step[] = [
  { id: 1, name: 'Init Wizard Path' },
  { id: 2, name: 'Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

const stepsCreate: Step[] = [
  { id: 1, name: 'Init Wizard Path' },
  { id: 2, name: 'Select Parent System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

export const InitWizardPath: FC = () => {
  const { nextStep, setStepPath } = useItemWizardStore()

  const { setValue } = useFormContext()

  const goToDestinationSystem = () => {
    setStepPath(stepsDestination)
    nextStep()
  }
  const goToSystemDetail = () => {
    setStepPath(stepsCreate)
    nextStep()
  }

  return (
    <div className="text-center">
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
  )
}
