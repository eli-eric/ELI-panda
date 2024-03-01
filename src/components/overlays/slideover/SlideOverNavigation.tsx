import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import { classNames } from '@/utils'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  panelSlide?: 'left' | 'right'
}

export const SlideOverNavigation: FC<PropsWithChildren<Props>> = ({ open, setOpen, children, panelSlide = 'left' }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={classNames(
                'pointer-events-none fixed inset-y-0 flex w-72',
                panelSlide === 'left' ? 'left-0 pr-14 ' : 'right-0 pl-14 '
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={panelSlide === 'left' ? '-translate-x-full' : 'translate-x-full'}
                enterTo={'translate-x-0'}
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom={'translate-x-0'}
                leaveTo={panelSlide === 'left' ? '-translate-x-full' : 'translate-x-full'}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col py-3 bg-slate-600 dark:bg-gray-900">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DarkModeSwitch className="ml-3 mt-1 text-center" />
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
