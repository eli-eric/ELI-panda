import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { FieldValues, FormState } from 'react-hook-form'
import { useIntl } from 'react-intl'

import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

const messages = message.common

type Config = {
  onContinue?: Function
  onCancel?: Function
}
interface Props<T extends FieldValues> {
  formState: FormState<T>
  config?: Config
}

export const FormLeaveWarning = <T extends FieldValues>({ formState, config }: Props<T>) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [nextUrl, setNextUrl] = useState<string>('')
  const { formatMessage } = useIntl()
  const { events } = router
  const { isDirty, isSubmitSuccessful } = formState
  const { onContinue, onCancel } = config ?? {}

  // handle route change events
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isDirty && !isOpen && !isSubmitSuccessful) {
        events.emit('routeChangeError')
        setNextUrl(url)
        setIsOpen(true)
        throw 'Abort route change. Please ignore this error.'
      }
    }
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitSuccessful) {
        event.preventDefault()
        event.returnValue = '' // Required for Chrome
      }
    }
    events.on('routeChangeStart', handleRouteChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty, events, router, isOpen, isSubmitSuccessful])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.buttons.continue,
      loading: false,
      onClick: () => {
        router.push(nextUrl)
        onContinue && onContinue()
      }
    },
    goBack: {
      text: messages.buttons.cancel,
      onClick: () => {
        setIsOpen(false)
        onCancel && onCancel()
      }
    }
  }

  return (
    <WarningModal
      buttons={modalButtons}
      open={isOpen}
      setOpen={setIsOpen}
      title={messages.form.leaveWarning.title}
      message={formatMessage({ id: messages.form.leaveWarning.text })}
      testid="leave-warning-modal"
    />
  )
}
