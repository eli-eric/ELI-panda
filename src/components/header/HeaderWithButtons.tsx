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

  const onBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    back()
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!onSubmit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmit?.()
  }

  const handleSubmitAndExit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!onSubmitAndExit) return
    const now = Date.now()
    if (now - lastSubmitTimeRef.current < DEBOUNCE_TIME) return
    lastSubmitTimeRef.current = now
    onSubmitAndExit?.()
  }

  return (
    <div className="sticky top-0 z-20 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b">
      <Card className="flex flex-1 justify-between">
        <div className="flex items-center mr-2">
          <BackButton
            className="mr-2"
            type="button"
            buttonSize="large"
            disabled={loading}
            onClick={onBack}
          />
          {disabledEdit && (
            <Fragment>
              <Button
                primary
                buttonSize="large"
                onClick={handleSubmitAndExit}
                disabled={loading || isFormInvalid}
                type="button"
                text={messages.saveAndExit}
              />
              <Button
                primary
                className="ml-2"
                buttonSize="large"
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
              buttonSize="large"
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
