import { useCallback, useEffect, useState } from 'react'
import Modal from 'src/components/modal/warning/modal-warning.comp'

const useWarningModal = (message: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState('')
  const [execData, setExecData] = useState({
    callback: undefined as Function | undefined,
    callbackArgs: undefined as any[] | undefined
  })

  useEffect(() => {
    const { callback, callbackArgs } = execData
    if (callback && callbackArgs && isConfirmed) {
      try {
        callback(...callbackArgs)
        setIsOpen(false)
        setIsConfirmed(false)
      } catch (err) {
        setError(String(err))
      }
    }
  }, [isConfirmed, execData])

  const deleteButtons = {
    goNext: {
      text: 'Delete',
      loading: false,
      onClick: () => setIsConfirmed(true)
    },
    goBack: {
      text: 'Cancel',
      onClick: () => {
        setIsOpen(false)
      }
    }
  }

  const withWarningModal = useCallback(
    <T extends any[], R>(callback: (...callbackArgs: T) => R) =>
      (...callbackArgs: T) => {
        setIsOpen(true)
        setExecData({ callback, callbackArgs })
      },
    []
  )

  const WarningModal = () => (
    <Modal
      buttons={deleteButtons}
      open={isOpen}
      setOpen={setIsOpen}
      title="Warning"
      message={message}
      error={error}
      testid={message}
    />
  )
  return { WarningModal, withWarningModal }
}

export default useWarningModal
