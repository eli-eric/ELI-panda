import Link from 'next/link'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { BackButton, Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

type Props = {
  onSubmitAndExit: () => void
  onSubmit: () => void
}

export const HeaderButtons = ({ onSubmitAndExit, onSubmit }: Props) => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])
  const { formatMessage: fm } = useIntl()

  return (
    <div className="flex space-x-2">
      {editPersmission && (
        <Fragment>
          <Button type="button" onClick={onSubmit}>
            {fm({ id: message.common.buttons.save })}
          </Button>
          <Button type="button" onClick={onSubmitAndExit}>
            {fm({ id: message.common.buttons.saveAndExit })}
          </Button>
        </Fragment>
      )}
      <Link href={PATH.ROOM_CARDS}>
        <BackButton />
      </Link>
    </div>
  )
}
