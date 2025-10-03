import { useCallback } from 'react'

import { useWarningModalStore } from '@/store/useWarningModalStore'

const useWarningModal = (globalMessage?: string) => {
  const openModal = useWarningModalStore(state => state.openModal)

  const withWarningModal = useCallback(
    <T extends any[], R>(
      callback: (...callbackArgs: T) => R,
      message?: string
    ) =>
      (...callbackArgs: T) => {
        const finalMessage = message ?? globalMessage ?? 'Are you sure?'
        openModal(finalMessage, callback, callbackArgs)
      },
    [globalMessage, openModal]
  )

  return withWarningModal
}

export default useWarningModal
