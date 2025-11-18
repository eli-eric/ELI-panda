import { XIcon } from 'lucide-react'
import React from 'react'
import { useIntl } from 'react-intl'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle
} from '@/components/ui/sheet'
import { message } from '@/i18n/src/messages'
import {
  type ModalSlot,
  useModalGlobalStore
} from '@/store/useModalGlobalStore'

// Individual modal components to handle animation states
const ModalSheet: React.FC<{
  slot: ModalSlot
  closeModal: (type: 'sheet') => void
}> = ({ slot, closeModal }) => {
  // Always render, but only show content when there's a component
  const Component = slot.component

  // Centralized close handler with dirty protection
  const handleClose = React.useCallback(() => {
    // Check if closing should be prevented
    if (slot.onCloseAttempt && !slot.onCloseAttempt()) {
      return // Prevent closing
    }
    if (slot.onClose) slot.onClose()
    closeModal('sheet')
  }, [slot, closeModal])

  // ESC key handler
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && slot.isOpen && !!Component) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [handleClose, slot.isOpen, Component])

  return (
    <Sheet
      open={slot.isOpen && !!Component}
      onOpenChange={open => {
        if (!open) {
          handleClose()
        }
      }}
    >
      <SheetPortal>
        {/* Custom overlay with protected close */}
        <SheetOverlay onClick={handleClose} />
        <SheetContent
          size={slot.props?.size || 'l'}
          side={slot.props?.side || 'right'}
          className="!max-w-none overflow-y-auto px-2 sm:px-4 lg:px-6"
        >
          {/* Custom X button with protected close */}
          <button
            onClick={handleClose}
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none z-10"
            aria-label="Close dialog"
          >
            <XIcon className="size-4" />
          </button>

          <SheetHeader>
            {slot.props?.title && (
              <SheetTitle>{slot.props?.title || 'Modal'}</SheetTitle>
            )}
            {slot.props?.description && (
              <SheetDescription>{slot.props.description}</SheetDescription>
            )}
          </SheetHeader>
          {Component && (
            <Component
              {...slot.props}
              onSubmit={slot.onSubmit}
              onClose={handleClose}
              parentTriggerFn={slot.parentTriggerFn}
            />
          )}
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}

const ModalDialog: React.FC<{
  slot: ModalSlot
  closeModal: (type: 'dialog1' | 'dialog2' | 'dialog3') => void
  type: 'dialog1' | 'dialog2' | 'dialog3'
}> = ({ slot, closeModal, type }) => {
  const { formatMessage: fm } = useIntl()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Check if closing should be prevented
      if (slot.onCloseAttempt && !slot.onCloseAttempt()) {
        return // Prevent closing
      }
      if (slot.onClose) slot.onClose()
      closeModal(type)
    }
  }

  // Always render, but only show content when there's a component
  const Component = slot.component

  return (
    <Dialog open={slot.isOpen && !!Component} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          size={slot.props?.size || 'l'}
          aria-describedby={
            slot.props?.description ? undefined : 'modal-content'
          }
        >
          <DialogHeader className="pb-2">
            {slot.props?.title && (
              <DialogTitle>{slot.props?.title || 'Dialog'}</DialogTitle>
            )}
            {slot.props?.description ? (
              <DialogDescription>{slot.props.description}</DialogDescription>
            ) : (
              <DialogDescription id="modal-content" className="sr-only">
                {fm({ id: message.common.forms.modalContent })}
              </DialogDescription>
            )}
          </DialogHeader>
          {Component && (
            <Component
              {...slot.props}
              onSubmit={slot.onSubmit}
              onClose={() => handleOpenChange(false)}
              parentTriggerFn={slot.parentTriggerFn}
            />
          )}
          <DialogClose asChild>
            <button aria-label="Close" />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

/**
 * ModalProvider renders one Sheet and two Dialogs as portals,
 * using the global modal store for state and content.
 */
export const ModalProvider: React.FC = () => {
  const { sheet, dialog1, dialog2, dialog3, closeModal } = useModalGlobalStore()

  return (
    <>
      <ModalSheet slot={sheet} closeModal={closeModal} />
      <ModalDialog slot={dialog1} closeModal={closeModal} type="dialog1" />
      <ModalDialog slot={dialog2} closeModal={closeModal} type="dialog2" />
      <ModalDialog slot={dialog3} closeModal={closeModal} type="dialog3" />
    </>
  )
}
