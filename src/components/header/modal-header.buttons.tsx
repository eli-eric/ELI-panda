
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

interface Props {
  isFormInvalid?: boolean
  onExit?: () => void
  isFetching?: boolean
}

export const ModalHeaderButtons = ({
  onExit,
  isFormInvalid = false,
  isFetching
}: Props) => {
  const { formatMessage: fm } = useIntl()

  return (
    <div className="flex sticky top-0 z-10 items-end justify-end mb-2">
      <div className="flex gap-2 pb-2">
        <Button size="sm" type="submit" disabled={isFetching || isFormInvalid}>
          {fm({ id: message.common.buttons.save })}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onExit}
          disabled={isFetching || isFormInvalid}
        >
          {fm({ id: message.common.buttons.exit })}
        </Button>
      </div>
    </div>
  )
}
