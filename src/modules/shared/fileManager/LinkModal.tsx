import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useLinkCreate } from './hooks/useLinks'

const buttons = message.common.buttons

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
      <div className="space-y-2">
        <Label htmlFor="link-url">Link URL</Label>
        <Input
          id="link-url"
          type="text"
          placeholder="Paste or type URL here"
          value={linkValue}
          onChange={e => setLinkValue(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="link-name">Link Name</Label>
        <Input
          id="link-name"
          type="text"
          placeholder="Enter a name for this link"
          value={linkName}
          onChange={e => setLinkName(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={buttons.cancel} />
        </Button>
        <Button
          type="button"
          disabled={!linkValue || !linkName}
          onClick={handleCreateLink}
        >
          <FormattedMessage id={buttons.continue} />
        </Button>
      </div>
    </div>
  )
}

export function openLinkModal({ parentUid }: { parentUid?: string }) {
  const { openModal } = useModalGlobalStore.getState()
  openModal('dialog1', {
    component: LinkModalContent,
    props: { parentUid, title: 'Create Link' },
    onClose: undefined
  })
}
