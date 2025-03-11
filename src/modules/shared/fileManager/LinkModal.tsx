import { useState } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import { useLinkCreate } from './hooks/useLinks'

const buttons = message.common.buttons

interface LinkModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  parentUid?: string
}

export const LinkModal = ({ open, setOpen, parentUid }: LinkModalProps) => {
  const [linkValue, setLinkValue] = useState('')
  const [linkName, setLinkName] = useState('')

  const { mutate: linkCreate } = useLinkCreate({ parentUid })

  const handleCreateLink = () => {
    linkCreate({ name: linkName, url: linkValue })
    setOpen(false)
    setLinkValue('')
    setLinkName('')
  }

  const modalLinkButtons: ModalButtons = {
    goNext: {
      text: buttons.continue,
      onClick: handleCreateLink
    },
    goBack: {
      text: buttons.cancel,
      onClick: () => {
        setOpen(false)
        setLinkValue('')
        setLinkName('')
      }
    }
  }

  return (
    <ModalComponent
      {...{
        open,
        setOpen,
        buttons: modalLinkButtons,
        title: 'Add New Link'
      }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="link-url"
            className="block text-sm font-medium text-gray-700"
          >
            Link URL
          </label>
          <input
            id="link-url"
            type="text"
            className="mt-1 form-field rounded-md w-full"
            placeholder="Paste or type URL here"
            value={linkValue}
            onChange={e => setLinkValue(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="link-name"
            className="block text-sm font-medium text-gray-700"
          >
            Link Name
          </label>
          <input
            id="link-name"
            type="text"
            className="mt-1 form-field rounded-md w-full"
            placeholder="Enter a name for this link"
            value={linkName}
            onChange={e => setLinkName(e.target.value)}
          />
        </div>
      </div>
    </ModalComponent>
  )
}
