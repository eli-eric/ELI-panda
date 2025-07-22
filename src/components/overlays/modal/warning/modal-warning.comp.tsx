import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import type { Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { ModalButtons } from '@/types/form'

interface ModalWarningComponentProps {
  title: string
  message: string
}

const ModalWarningComponent = ({
  title,
  message
}: ModalWarningComponentProps) => (
  <div className="sm:flex sm:items-start">
    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      <ExclamationTriangleIcon
        className="h-6 w-6 text-red-600"
        aria-hidden="true"
      />
    </div>
    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle asChild>
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
          <FormattedMessage id={title} />
        </h3>
      </DialogTitle>
      <DialogDescription asChild>
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-200">{message}</p>
        </div>
      </DialogDescription>
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
const WarningModal = ({
  open,
  error,
  setOpen,
  buttons,
  title,
  message,
  testid
}: WarningModalProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            <FormattedMessage id={title} />
          </span>
        </DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      {error && <ErrorPage />}
      <DialogFooter>
        {buttons.goBack && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setOpen(false)
              buttons.goBack?.onClick?.()
            }}
          >
            {buttons.goBack.text}
          </button>
        )}
        {buttons.goNext && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              buttons.goNext?.onClick?.()
              setOpen(false)
            }}
          >
            {buttons.goNext.text}
          </button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default WarningModal
