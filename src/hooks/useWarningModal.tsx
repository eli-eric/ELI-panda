import { useCallback, useEffect, useState } from 'react'
import Modal from 'src/components/modal/warning/modal-warning.comp'

const useWarningModal = (message: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [error, setError] = useState('')
  const [execData, setExecData] = useState({
    fn: undefined as Function | undefined,
    args: undefined as any[] | undefined
  })

  useEffect(() => {
    const { fn, args } = execData
    if (fn && args && isConfirmed) {
      try {
        fn(...args)
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
    <T extends any[], R>(callback: (...args: T) => R) =>
      (...args: T) => {
        setIsOpen(true)
        setExecData({ fn: callback, args })
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
