import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

const messages = message.common

interface Props {
  isDirty: boolean
}

export const useFormLeaveWarning = ({ isDirty }: Props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [nextUrl, setNextUrl] = useState<string>('')
  const { formatMessage } = useIntl()
  const { events } = router

  // handle route change events
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isDirty && !isOpen) {
        events.emit('routeChangeError')
        setNextUrl(url)
        setIsOpen(true)
        throw 'Abort route change. Please ignore this error.'
      }
    }
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
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
  }, [isDirty, events, router, isOpen])

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.buttons.continue,
      loading: false,
      onClick: () => {
        router.push(nextUrl)
      }
    },
    goBack: {
      text: messages.buttons.cancel,
      onClick: () => {
        setIsOpen(false)
      }
    }
  }

  const Modal = () => (
    <WarningModal
      buttons={modalButtons}
      open={isOpen}
      setOpen={setIsOpen}
      title={messages.form.leaveWarning.title}
      message={formatMessage({ id: messages.form.leaveWarning.text })}
      testid="leave-warning-modal"
    />
  )

  return Modal
}
