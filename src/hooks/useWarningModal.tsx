import { startTransition, useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { useWarningModalStore } from '@/store/useWarningModalStore'

const useWarningModal = (globalMessage?: string) => {
  const [params, patchParams, resetParams, exec, setExec, clearExec] =
    useWarningModalStore(
      state => [
        state.params,
        state.patchParams,
        state.resetParams,
        state.exec,
        state.setExec,
        state.clearExec
      ],
      shallow
    )

  const { isOpen, isConfirmed } = params

  useEffect(() => {
    startTransition(() => {
      console.log('useWarningModal effect', { isConfirmed, hasExec: !!exec })
      if (exec && exec.callback && isConfirmed) {
        console.log('useWarningModal: executing exec.callback', exec)
        try {
          exec.callback(...(exec.callbackArgs || []))
          clearExec()
          resetParams()
        } catch (err) {
          patchParams({ error: String(err) })
        }
      }
    })
  }, [isConfirmed, exec, clearExec, resetParams, patchParams])

  // Cancel execution on close when not confirmed
  useEffect(() => {
    startTransition(() => {
      if (!isOpen && exec && !isConfirmed) {
        console.log(
          'useWarningModal: clearing exec because modal closed without confirmation'
        )
        clearExec()
      }
      // If confirmed, do not clear here, let the isConfirmed effect handle it
    })
  }, [exec, isOpen, isConfirmed, clearExec])

  const withWarningModal = useCallback(
    <T extends any[], R>(
      callback: (...callbackArgs: T) => R,
      message?: string
    ) =>
      (...callbackArgs: T) => {
        const newParams = {
          isOpen: true,
          isConfirmed: false,
          error: '',
          message: message ?? globalMessage ?? 'Are you sure?'
        }
        console.log(
          'withWarningModal: opening warning modal, callback:',
          callback,
          'args:',
          callbackArgs
        )
        patchParams(newParams)
        setExec({ callback, callbackArgs })
        console.log('withWarningModal: exec set in store')
      },
    [globalMessage, patchParams]
  )

  return withWarningModal
}

export default useWarningModal
