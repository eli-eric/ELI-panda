import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { OperationalStateHistoryModal } from './OperationalStateHistoryModal'

const messages = message.roomCardsPage.form.operationalState

type Props = {
  roomCardUid?: string
}

export const OperationalStateHistoryButton = ({ roomCardUid }: Props) => {
  const { openModal } = useDynamicModalStore()

  const handleOpenHistory = () => {
    openModal('dialog', {
      id: 'operational-state-history',
      component: OperationalStateHistoryModal,
      props: {
        title: 'Operational State History',
        roomCardUid,
        size: 'xl'
      }
    })
  }

  return (
    <Button
      onClick={handleOpenHistory}
      variant="outline"
      size="sm"
      type="button"
    >
      <FormattedMessage id={messages.viewHistory} />
    </Button>
  )
}
