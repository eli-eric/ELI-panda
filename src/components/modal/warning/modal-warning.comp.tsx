import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { ModalButtons } from '@/types/form'

import ModalComponent from '../modal.comp'

interface ModalWarningComponentProps {
  title: string
  message: string
}

const ModalWarningComponent = ({ title, message }: ModalWarningComponentProps) => (
  <div className="sm:flex sm:items-start">
    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
    </div>
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
        <FormattedMessage id={title} />
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  </div>
)

interface WarningModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  buttons: ModalButtons
  error?: string
  title: string
  message: string
  testid: string
}
const WarningModal = ({ open, error, setOpen, buttons, title, message, testid }: WarningModalProps) => (
  <ModalComponent open={open} setOpen={setOpen} buttons={buttons} testid={testid}>
    <ModalWarningComponent title={title} message={message} />
    {error && <ErrorPage />}
  </ModalComponent>
)

export default WarningModal
