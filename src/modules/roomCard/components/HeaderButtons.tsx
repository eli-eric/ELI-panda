import Link from 'next/link'
import { Fragment } from 'react'

import { BackButton, Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

type Props = {
  onSubmitAndExit: () => void
  onSubmit: () => void
}

export const HeaderButtons = ({ onSubmitAndExit, onSubmit }: Props) => {
  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  return (
    <div className="flex space-x-2">
      {editPersmission && (
        <Fragment>
          <Button type="button" primary onClick={onSubmit}>
            Save
          </Button>
          <Button type="button" primary onClick={onSubmitAndExit}>
            Save and exit
          </Button>
        </Fragment>
      )}
      <Link href={PATH.ROOM_CARDS}>
        <BackButton buttonSize="large" />
      </Link>
    </div>
  )
}
