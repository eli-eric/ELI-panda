import { useCallback, useEffect, useState } from 'react'

import { useModalStore } from '@/store/useModalStore'

export const useModal = (children?: React.ReactNode, submit?: boolean) => {
  const [execData, setExecData] = useState({
    callback: undefined as Function | undefined,
    callbackArgs: undefined as any[] | undefined
  })
  const { params, patchParams, resetParams } = useModalStore()

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

  const withChildrenModal = useCallback(
    <T extends any[], R>(callback?: (...callbackArgs: T) => R) =>
      (...callbackArgs: T) => {
        const newParams = {
          isOpen: true,
          isConfirmed: false,
          error: '',
          submit,
          children: children
        }
        patchParams(newParams)
        setExecData({ callback, callbackArgs })
      },
    [children, patchParams, submit]
  )

  return withChildrenModal
}
