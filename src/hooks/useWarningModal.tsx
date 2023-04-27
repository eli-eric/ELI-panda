import { useCallback, useEffect, useState } from 'react'
import Modal from 'src/components/modal/warning/modal-warning.comp'

const useWarningModal = (message: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const [execParams, setExecParms] = useState({
    fn: undefined as Function | undefined,
    args: undefined as any[] | undefined
  })
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    const { fn, args } = execParams
    if (fn && args && isConfirmed) {
      setIsOpen(false)
      setIsConfirmed(false)
      fn(...args)
    }
  }, [isConfirmed, execParams])

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
    (fn: Function) =>
      (...args: any[]) => {
        setIsOpen(true)
        setExecParms({ fn, args })
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
      error={''}
      testid={message}
    />
  )
  return { WarningModal, withWarningModal }
}

export default useWarningModal
