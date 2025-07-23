import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
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

export const FormLeaveWarning = <T extends FieldValues>({
  formState,
  config
}: Props<T>) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [nextUrl, setNextUrl] = useState<string>('')
  const { formatMessage } = useIntl()
  const { events } = router
  const { isDirty, isSubmitSuccessful } = formState
  const { onContinue, onCancel } = config ?? {}

  // Track if navigation was confirmed to prevent re-triggering
  const navigationConfirmedRef = useRef(false)

  // handle route change events
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const currentPath = router.asPath.split('?')[0]
      const nextPath = url.split('?')[0]
      if (currentPath === nextPath) {
        // Same page navigation, ignore
        return
      }

      // If navigation was already confirmed, allow it and reset the flag
      if (navigationConfirmedRef.current) {
        navigationConfirmedRef.current = false
        return
      }

      // If modal is already open for this URL, don't open it again
      if (isOpen && nextUrl === url) {
        return
      }

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
  }, [isDirty, events, router, isOpen, isSubmitSuccessful, nextUrl])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.buttons.continue,
      loading: false,
      onClick: () => {
        navigationConfirmedRef.current = true // Mark navigation as confirmed
        setIsOpen(false) // Close modal first
        onContinue && onContinue()
        // Use setTimeout to ensure modal is closed before navigation
        setTimeout(() => {
          router.push(nextUrl)
        }, 0)
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
