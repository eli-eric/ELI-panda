import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'

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
  isFormInvalid?: boolean
}
const messages = message.common.buttons

export const HeaderWithButtons = ({
  loading,
  onSubmit,
  onSubmitAndExit,
  editRole,
  customElement,
  isFormInvalid = false
}: Props) => {
  const disabledEdit = usePermission([editRole])
  const { back } = useRouter()
  const DEBOUNCE_TIME = 1500
  const lastSubmitTimeRef = useRef<number>(0)

  const onBack = () => {
    if (loading) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    back()
  }

  const handleSubmit = () => {
    if (!onSubmit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmit?.()
  }

  const handleSubmitAndExit = () => {
    if (!onSubmitAndExit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmitAndExit?.()
  }

  return (
    <div className="sticky top-0 z-20 flex h-16 shrink-0 bg-background">
      <Card className="flex flex-1 justify-between">
        <div className="flex items-center mr-2">
          <BackButton
            className="mr-2"
            type="button"
            disabled={loading}
            onClick={onBack}
          />
          {disabledEdit && (
            <Fragment>
              <Button
                onClick={handleSubmitAndExit}
                disabled={loading || isFormInvalid}
                type="button"
                text={messages.saveAndExit}
              />
              <Button
                className="ml-2"
                onClick={handleSubmit}
                disabled={loading || isFormInvalid}
                type="button"
                text={messages.save}
              />
            </Fragment>
          )}
          {loading && (
            <Button
              className="ml-2 bg-inherit border-none shadow-none"
              loading={loading}
              text={'Saving...'}
            />
          )}
        </div>
        {customElement}
      </Card>
    </div>
  )
}
