import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'

import { openItemMoveModal } from './item-move.modal'

export const ItemMoveButton: FC = () => {
  const { formatMessage: fm } = useIntl()
  return (
    <Button onClick={openItemMoveModal}>
      {fm({ id: message.common.forms.moveItem })}
    </Button>
  )
}
