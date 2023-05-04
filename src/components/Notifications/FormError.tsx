import { Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Toast } from 'react-hot-toast'

interface Props {
  dismiss: (id: string) => void
  t: Toast

  message?: string
}

export default function FormError({ dismiss, t, message }: Props) {
  const [show, setShow] = useState(true)
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white rounded-lg pointer-events-auto flex`}
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-6 w-6 text-primary-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{message}</p>
                  <p className="mt-1 text-sm text-gray-500"></p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setShow(false)
                      dismiss(t.id)
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
