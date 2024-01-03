import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { useEscapeKey } from '@/hooks/useEscapeKey'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import ModalButtonsComponent from './modal.buttons'

const messages = message.common.buttons

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  testid?: string
  buttons?: ModalButtons
}

export default function ModalComponent({ open, children, testid, buttons, setOpen }: Props) {
  useEscapeKey(() => {
    setOpen(false)
  })

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => {}} unmount={false}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div data-testid={testid + '-modal'} className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <Fragment>
                  {children}
                  {buttons?.noButtons !== true && <ModalButtonsComponent testid={testid} buttons={buttons} />}
                </Fragment>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export const Modal = ({ children, open, setOpen, buttons, testid = 'modal' }: Props) => {
  const defaultButtons: ModalButtons = {
    goNext: {
      testid: 'close',
      text: messages.close,
      onClick: () => setOpen(false)
    }
  }

  return (
    <ModalComponent
      {...{
        testid,
        open,
        setOpen,
        buttons
      }}
    >
      {children}
      {!buttons && <ModalButtonsComponent testid={testid} buttons={defaultButtons} />}
    </ModalComponent>
  )
}
