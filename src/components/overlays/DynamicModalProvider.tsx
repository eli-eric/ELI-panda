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
  type ModalInstance,
  useDynamicModalStore
} from '@/store/useDynamicModalStore'

/**
 * Individual Sheet Renderer
 * Renders a single sheet modal with dynamic z-index
 */
const ModalSheetRenderer: React.FC<{
  modal: ModalInstance
  onClose: () => void
}> = ({ modal, onClose }) => {
  // Centralized close handler with dirty protection
  const handleClose = React.useCallback(() => {
    // Check if closing should be prevented
    if (modal.onCloseAttempt && !modal.onCloseAttempt()) {
      return // Prevent closing
    }
    onClose()
  }, [modal, onClose])

  // ESC key handler
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [handleClose])

  const Component = modal.component
  const overlayZIndex = modal.zIndex
  const contentZIndex = modal.zIndex + 1

  return (
    <Sheet
      open={true}
      onOpenChange={open => {
        if (!open) {
          handleClose()
        }
      }}
    >
      <SheetPortal>
        {/* Custom overlay with dynamic z-index */}
        <SheetOverlay style={{ zIndex: overlayZIndex }} onClick={handleClose} />
        <SheetContent
          style={{ zIndex: contentZIndex }}
          size={modal.props?.size || 'l'}
          side={modal.props?.side || 'right'}
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
            {modal.props?.title && (
              <SheetTitle>{modal.props?.title || 'Modal'}</SheetTitle>
            )}
            {modal.props?.description && (
              <SheetDescription>{modal.props.description}</SheetDescription>
            )}
          </SheetHeader>
          {Component && (
            <Component
              {...modal.props}
              onSubmit={modal.onSubmit}
              onClose={handleClose}
              parentTriggerFn={modal.parentTriggerFn}
            />
          )}
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}

/**
 * Individual Dialog Renderer
 * Renders a single dialog modal with dynamic z-index
 */
const ModalDialogRenderer: React.FC<{
  modal: ModalInstance
  onClose: () => void
}> = ({ modal, onClose }) => {
  const { formatMessage: fm } = useIntl()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Check if closing should be prevented
      if (modal.onCloseAttempt && !modal.onCloseAttempt()) {
        return // Prevent closing
      }
      onClose()
    }
  }

  const Component = modal.component
  const overlayZIndex = modal.zIndex
  const contentZIndex = modal.zIndex + 1

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay style={{ zIndex: overlayZIndex }} />
        <DialogContent
          style={{ zIndex: contentZIndex }}
          size={modal.props?.size || 'l'}
          aria-describedby={
            modal.props?.description ? undefined : 'modal-content'
          }
        >
          <DialogHeader className="pb-2">
            {modal.props?.title && (
              <DialogTitle>{modal.props?.title || 'Dialog'}</DialogTitle>
            )}
            {modal.props?.description ? (
              <DialogDescription>{modal.props.description}</DialogDescription>
            ) : (
              <DialogDescription id="modal-content" className="sr-only">
                {fm({ id: message.common.forms.modalContent })}
              </DialogDescription>
            )}
          </DialogHeader>
          {Component && (
            <Component
              {...modal.props}
              onSubmit={modal.onSubmit}
              onClose={() => handleOpenChange(false)}
              parentTriggerFn={modal.parentTriggerFn}
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
 * DynamicModalProvider
 * Renders all active modals dynamically based on modalOrder
 * Each modal gets automatic z-index management
 *
 * Usage:
 * Add to your app layout alongside the old ModalProvider
 * <ModalProvider /> {/* old system *//*}
 * <DynamicModalProvider /> {/* new system *//*}
 */
export const DynamicModalProvider: React.FC = () => {
  const { modalOrder, modals, closeModal } = useDynamicModalStore()

  return (
    <>
      {modalOrder.map(modalId => {
        const modal = modals[modalId]
        if (!modal) return null

        const handleClose = () => closeModal(modalId)

        if (modal.type === 'sheet') {
          return (
            <ModalSheetRenderer
              key={modalId}
              modal={modal}
              onClose={handleClose}
            />
          )
        }

        return (
          <ModalDialogRenderer
            key={modalId}
            modal={modal}
            onClose={handleClose}
          />
        )
      })}
    </>
  )
}
