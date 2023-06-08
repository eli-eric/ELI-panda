import { useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

import useWarningModalStore from '@/store/useWarningModalStore'

const useWarningModal = (message?: string) => {
  const [execData, setExecData] = useState({
    callback: undefined as Function | undefined,
    callbackArgs: undefined as any[] | undefined
  })

  const [params, patchParams, resetParams] = useWarningModalStore(
    state => [state.params, state.patchParams, state.resetParams],
    shallow
  )

  const { isOpen, isConfirmed } = params

  const { callback, callbackArgs } = execData

  useEffect(() => {
    if (callback && callbackArgs && isConfirmed) {
      try {
        callback(...callbackArgs)
        resetParams()
      } catch (err) {
        patchParams({ error: String(err) })
      }
    }
  }, [isConfirmed, callback, callbackArgs, resetParams, patchParams])

  //Cancel execution on close
  useEffect(() => {
    if (!isOpen && callbackArgs) {
      setExecData({
        callback: undefined,
        callbackArgs: undefined
      })
    }
  }, [callback, callbackArgs, isOpen])

  const withWarningModal = useCallback(
    <T extends any[], R>(callback: (...callbackArgs: T) => R, currentMessage?: string) =>
      (...callbackArgs: T) => {
        const newParams = {
          isOpen: true,
          isConfirmed: false,
          error: '',
          message: currentMessage ?? message ?? 'Are you sure?'
        }
        patchParams(newParams)
        setExecData({ callback, callbackArgs })
      },
    [message, patchParams]
  )

  return withWarningModal
}

export default useWarningModal
