import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'

export type SlideOverButtons = {
  goNext: {
    type: 'button' | 'submit'
    text: string
    onClick: () => void
  }
  goAlter?: {
    type: 'button' | 'submit'
    text: string
    onClick: () => void
  }
}

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  panelTitle: string
  buttons: SlideOverButtons
}
export const SlideOver: FC<PropsWithChildren<Props>> = ({ children, open, setOpen, panelTitle, buttons }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setOpen}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen md:max-w-xl max-w-md">
                <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {panelTitle}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
                  </div>
                  <div className="flex flex-shrink-0 px-4 py-4 justify-between">
                    <Button type="button" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    {buttons.goAlter && (
                      <Button type={buttons.goAlter.type} onClick={buttons.goAlter.onClick}>
                        {buttons.goAlter.text}
                      </Button>
                    )}
                    <Button type={buttons.goNext.type} primary onClick={buttons.goNext.onClick}>
                      {buttons.goNext.text}
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)
