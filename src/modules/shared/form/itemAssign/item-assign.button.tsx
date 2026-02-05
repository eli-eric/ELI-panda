import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'

import { openItemAssignModal } from './item-assign.modal'

export const ItemAssignButton: FC = () => {
    const { formatMessage: fm } = useIntl()
    return (
        <Button onClick={openItemAssignModal}>{fm({ id: message.common.forms.assignItem })}</Button>
    )
}
