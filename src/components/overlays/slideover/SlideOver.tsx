import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { cn } from '@/lib/utils'

type ButtonType = {
  type: 'button' | 'submit'
  className?: string
  text: string
  onClick: () => void
}

export type SlideOverButtons = {
  className?: string
  goNext: ButtonType
  goAlter?: ButtonType
  goBack?: ButtonType
}

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  panelTitle?: string
  buttons?: SlideOverButtons
  RenderSettings?: JSX.Element
  panelSlide?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
export const SlideOver: FC<PropsWithChildren<Props>> = ({
  children,
  open,
  setOpen,
  panelTitle,
  buttons,
  RenderSettings,
  panelSlide = 'left',
  size = 'sm',
  className
}) => {
  const getWidthClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-screen md:max-w-xl max-w-md'
      case 'md':
        return 'w-screen md:max-w-2xl max-w-lg'
      case 'lg':
        return 'w-screen md:max-w-4xl max-w-xl'
      default:
        return 'w-screen md:max-w-xl max-w-md'
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={cn('relative z-30', className)}
        onClose={setOpen}
      >
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                'pointer-events-none fixed inset-y-0 flex max-w-full',
                panelSlide === 'left' ? 'left-0' : 'right-0'
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom={
                  panelSlide === 'left'
                    ? '-translate-x-full'
                    : 'translate-x-full'
                }
                enterTo={'translate-x-0'}
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom={'translate-x-0'}
                leaveTo={
                  panelSlide === 'left'
                    ? '-translate-x-full'
                    : 'translate-x-full'
                }
              >
                <Dialog.Panel
                  className={cn('pointer-events-auto', getWidthClasses())}
                >
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
                            {panelTitle}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {children}
                      </div>
                    </div>
                    {RenderSettings && (
                      <div className="flex px-4 py-4">{RenderSettings}</div>
                    )}
                    {buttons && (
                      <div
                        className={cn(
                          'flex shrink-0 px-4 py-4 justify-between',
                          buttons.className
                        )}
                      >
                        {buttons.goBack && (
                          <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            className={buttons.goBack.className}
                          >
                            Cancel
                          </Button>
                        )}
                        {buttons.goAlter && (
                          <Button
                            type={buttons.goAlter.type}
                            onClick={buttons.goAlter.onClick}
                            className={buttons.goAlter.className}
                          >
                            {buttons.goAlter.text}
                          </Button>
                        )}
                        <Button
                          type={buttons.goNext.type}
                          onClick={buttons.goNext.onClick}
                          className={buttons.goNext.className}
                        >
                          {buttons.goNext.text}
                        </Button>
                      </div>
                    )}
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

export default SlideOver
