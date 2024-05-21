import Link from 'next/link'
import { Fragment } from 'react'

import { BackButton, Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import type { ROLE } from '@/types/constants/roles'

type Props = {
  onSubmitAndExit?: () => void
  onSubmit: () => void
  role: ROLE
  exitTo: string
}

export const PageHeaderButtons = ({
  onSubmitAndExit,
  onSubmit,
  role,
  exitTo
}: Props) => {
  const editPersmission = usePermission([role])

  return (
    <div className="flex space-x-2">
      {editPersmission && (
        <Fragment>
          <Button type="button" primary onClick={onSubmit}>
            Save
          </Button>
          {onSubmitAndExit && (
            <Button type="button" primary onClick={onSubmitAndExit}>
              Save and exit
            </Button>
          )}
        </Fragment>
      )}
      <Link href={exitTo}>
        <BackButton buttonSize="large" />
      </Link>
    </div>
  )
}
