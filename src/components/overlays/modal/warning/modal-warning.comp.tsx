import { AlertTriangle } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { ModalButtons } from '@/types/form'

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
  message
}: WarningModalProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <FormattedMessage id={title} />
          </span>
        </DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      {error && <ErrorPage />}
      <DialogFooter>
        {buttons.goBack && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false)
              buttons.goBack?.onClick?.()
            }}
          >
            <FormattedMessage
              id={buttons.goBack.text}
              defaultMessage={'Cancel'}
            />
          </Button>
        )}
        {buttons.goNext && (
          <Button
            type="button"
            onClick={() => {
              buttons.goNext?.onClick?.()
              setOpen(false)
            }}
          >
            <FormattedMessage
              id={buttons.goNext.text}
              defaultMessage={'Continue'}
            />
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default WarningModal
