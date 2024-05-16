import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { BackButton, Button } from '@/components/Buttons'
import Card from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import type { ROLE } from '@/types/constants/roles'

interface Props {
  loading?: boolean
  onSubmit?: () => void
  onSubmitAndExit?: () => void
  editRole: ROLE
  customElement?: React.ReactNode
}
const messages = message.common.buttons

export const HeaderWithButtons = ({
  loading,
  onSubmit,
  onSubmitAndExit,
  editRole,
  customElement
}: Props) => {
  const disabledEdit = usePermission([editRole])
  const { back } = useRouter()

  const onBack = () => {
    back()
  }

  return (
    <div className="sticky  top-0 z-20 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b">
      <Card className="flex flex-1 justify-between">
        <div className="flex items-center mr-2">
          <BackButton
            className="mr-2"
            type="button"
            buttonSize="large"
            onClick={onBack}
          />
          {disabledEdit && (
            <Fragment>
              <Button
                primary
                buttonSize="large"
                onClick={onSubmitAndExit}
                loading={loading}
                disabled={loading}
                type="button"
                text={messages.saveAndExit}
              />
              <Button
                primary
                className="ml-2"
                buttonSize="large"
                onClick={onSubmit}
                disabled={loading}
                loading={loading}
                type="button"
                text={messages.save}
              />
            </Fragment>
          )}
        </div>
        {customElement}
      </Card>
    </div>
  )
}
