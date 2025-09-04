import React from 'react'

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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle
} from '@/components/ui/sheet'
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

  return (
    <Sheet
      open={slot.isOpen && !!Component}
      onOpenChange={open => {
        if (!open) {
          if (slot.onClose) slot.onClose()
          closeModal('sheet')
        }
      }}
    >
      <SheetPortal>
        <SheetOverlay />
        <SheetContent 
          size={slot.props?.size || 'l'} 
          className="!max-w-none overflow-y-auto px-2 sm:px-4 lg:px-6"
        >
          <SheetHeader>
            <SheetTitle>{slot.props?.title || 'Modal'}</SheetTitle>
            {slot.props?.description && (
              <SheetDescription>{slot.props.description}</SheetDescription>
            )}
          </SheetHeader>
          {Component && (
            <Component
              {...slot.props}
              onSubmit={slot.onSubmit}
              onClose={() => closeModal('sheet')}
              parentTriggerFn={slot.parentTriggerFn}
            />
          )}
          <SheetClose asChild>
            <button aria-label="Close" />
          </SheetClose>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}

const ModalDialog: React.FC<{
  slot: ModalSlot
  closeModal: (type: 'dialog1' | 'dialog2') => void
  type: 'dialog1' | 'dialog2'
}> = ({ slot, closeModal, type }) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
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
        <DialogContent size={slot.props?.size || 'l'}>
          <DialogHeader>
            <DialogTitle>{slot.props?.title || 'Dialog'}</DialogTitle>
            {slot.props?.description && (
              <DialogDescription>{slot.props.description}</DialogDescription>
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
  const { sheet, dialog1, dialog2, closeModal } = useModalGlobalStore()

  return (
    <>
      <ModalSheet slot={sheet} closeModal={closeModal} />
      <ModalDialog slot={dialog1} closeModal={closeModal} type="dialog1" />
      <ModalDialog slot={dialog2} closeModal={closeModal} type="dialog2" />
    </>
  )
}
