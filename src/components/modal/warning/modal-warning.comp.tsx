import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

interface Props {
  title: string
  message: string
}

const ModalWarningComponent = ({ title, message }: Props) => (
  <div className="sm:flex sm:items-start">
    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      <ExclamationTriangleIcon
        className="h-6 w-6 text-red-600"
        aria-hidden="true"
      />
    </div>
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        {title}
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  </div>
)

export default ModalWarningComponent
