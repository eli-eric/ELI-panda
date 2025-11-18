import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useLinkCreate } from './hooks/useLinks'

const buttons = message.common.buttons
const filesMsg = message.common.files

// Store modalId in closure for LinkModalContent to access
let currentLinkModalId: string | undefined

export function LinkModalContent({
  parentUid,
  onClose
}: {
  parentUid?: string
  onClose?: () => void
}) {
  const [linkValue, setLinkValue] = useState('')
  const [linkName, setLinkName] = useState('')
  const { formatMessage: fm } = useIntl()

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
        <Label htmlFor="link-url">
          <FormattedMessage id={filesMsg.linkUrl} />
        </Label>
        <Input
          id="link-url"
          type="text"
          placeholder={fm({ id: filesMsg.linkUrlPlaceholder })}
          value={linkValue}
          onChange={e => setLinkValue(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="link-name">
          <FormattedMessage id={filesMsg.linkName} />
        </Label>
        <Input
          id="link-name"
          type="text"
          placeholder={fm({ id: filesMsg.linkNamePlaceholder })}
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
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useDynamicModalStore.getState()
  currentLinkModalId = openModal('dialog', {
    id: 'link-modal',
    component: LinkModalContent,
    props: { parentUid, title: message.common.files.createLinkTitle },
    onClose: undefined
  })

  return currentLinkModalId
}
