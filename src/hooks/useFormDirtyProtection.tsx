import type { UseFormReturn } from 'react-hook-form'

import useWarningModal from './useWarningModal'

export const useFormDirtyProtection = (formMethods: UseFormReturn<any>) => {
  const withWarningModal = useWarningModal(
    'You have unsaved changes. Are you sure you want to continue?'
  )

  const withDirtyProtection = <T extends any[]>(
    callback: (...args: T) => void
  ) => {
    return (...args: T) => {
      if (!formMethods.formState.isDirty) {
        callback(...args)
        return
      }

      withWarningModal(() => {
        callback(...args)
      })()
    }
  }

  return { withDirtyProtection }
}
