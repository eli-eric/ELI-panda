import { Transition } from '@headlessui/react'
import { AlertTriangle, CheckCircle, X } from 'lucide-react'
import { Fragment, useState } from 'react'
import { resolveValue, type Toast, toast } from 'react-hot-toast'

import { cn } from '@/lib/utils'

import ButtonLoaderComponent from '../button-loader.comp'

interface Props {
  t: Toast
}

export const Notification = ({ t }: Props) => {
  const [show, setShow] = useState(true)
  return (
    <div
      className={cn(
        'w-[800px] bg-white dark:bg-gray-800 rounded-lg pointer-events-auto flex',
        t.visible ? 'animate-enter' : 'animate-leave'
      )}
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
          <div className="pointer-events-auto w-full overflow-hidden rounded-lg bg-white dark:bg-orange-700 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  {t.type === 'error' && (
                    <AlertTriangle
                      className="h-6 w-6 text-red-400 dark:text-black"
                      aria-hidden="true"
                    />
                  )}
                  {t.type === 'success' && (
                    <CheckCircle
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  )}
                  {t.type === 'loading' && <ButtonLoaderComponent />}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {resolveValue(t.message, t)}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setShow(false)
                      toast.dismiss(t.id)
                    }}
                    aria-label="Close notification"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
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
