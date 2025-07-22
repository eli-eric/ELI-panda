import { useState } from 'react'

import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useLinkCreate } from './hooks/useLinks'

const buttons = message.common.buttons

interface LinkModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  parentUid?: string
}

export function LinkModalContent({
  parentUid,
  onClose
}: {
  parentUid?: string
  onClose?: () => void
}) {
  const [linkValue, setLinkValue] = useState('')
  const [linkName, setLinkName] = useState('')

  const { mutate: linkCreate } = useLinkCreate({ parentUid })

  const handleCreateLink = () => {
    linkCreate({ name: linkName, url: linkValue })
    if (onClose) onClose()
    setLinkValue('')
    setLinkName('')
  }

  return (
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
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          {buttons.cancel}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!linkValue || !linkName}
          onClick={handleCreateLink}
        >
          {buttons.continue}
        </button>
      </div>
    </div>
  )
}

export function openLinkModal({ parentUid }: { parentUid?: string }) {
  const { openModal } = useModalGlobalStore.getState()
  openModal('dialog1', {
    component: LinkModalContent,
    props: { parentUid },
    onClose: undefined
  })
}
