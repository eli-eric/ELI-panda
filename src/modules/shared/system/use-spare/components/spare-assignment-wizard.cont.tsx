import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import useTableStateStore from '@/store/useTableStateStore'

import { useAssignSpare } from '../hooks/useAssignSpare'
import { useSpareAssignmentSteps } from '../hooks/useSpareAssignmentSteps'
import type { SpareAssignmentFormType, SpareAssignmentPayload } from '../types'

interface SpareAssignmentWizardProps {
  systemUid: string
  spareItemUid: string
  onSuccess?: () => void
}

const tableId = 'spare-parent-system-select-table'

export const SpareAssignmentWizardContainer = ({
  systemUid,
  spareItemUid,
  onSuccess
}: SpareAssignmentWizardProps) => {
  const { formatMessage: fm } = useIntl()
  const steps = useSpareAssignmentSteps()
  const { mutateAsync, isPending } = useAssignSpare()
  const { closeModal } = useModalGlobalStore()
  const queryClient = useQueryClient()

  const initialData: Partial<SpareAssignmentFormType> = useMemo(
    () => ({
      autoAssignParent: true
    }),
    []
  )

  const handleSubmit = async (
    data: SpareAssignmentFormType,
    reset: () => void
  ) => {
    try {
      // Validate required fields
      if (!data.oldItemCondition) {
        toast.error(fm({ id: message.common.spareAssignment.errors.conditionRequired }))
        return
      }

      if (!data.newItemLocation) {
        toast.error(fm({ id: message.common.spareAssignment.errors.locationRequired }))
        return
      }

      // Get selected system UID from table state if auto-assign is disabled
      let newParentSystemUid: string | undefined

      if (!data.autoAssignParent) {
        const { instances } = useTableStateStore.getState()
        const rowSelection = instances[tableId]?.rowSelection || {}
        const selectedRowIds = Object.keys(rowSelection).filter(
          key => rowSelection[key]
        )

        if (selectedRowIds.length === 0) {
          toast.error(
            fm({ id: message.common.spareAssignment.errors.noSystemSelected })
          )
          return
        }

        newParentSystemUid = selectedRowIds[0]
      }

      const payload: SpareAssignmentPayload = {
        systemUid,
        spareItemUid,
        oldItemCondition: data.oldItemCondition,
        newItemLocation: data.newItemLocation,
        ...(newParentSystemUid && { newParentSystemUid })
      }

      await mutateAsync(payload)

      // Invalidate relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [systemUid] }),
        queryClient.invalidateQueries({ queryKey: ['systems'] }),
        queryClient.invalidateQueries({ queryKey: ['system-detail'] })
      ])

      toast.success(
        fm({ id: message.common.spareAssignment.success.assigned })
      )

      // Call onSuccess callback to refresh system detail
      if (onSuccess) {
        onSuccess()
      }

      reset()
      closeModal('dialog2')
    } catch (error) {
      toast.error(
        fm({ id: message.common.spareAssignment.errors.assignmentFailed })
      )
      console.error('Failed to assign spare part:', error)
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">
            {fm({ id: message.common.spareAssignment.processing })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <FormWizard<SpareAssignmentFormType>
      steps={steps}
      onSubmit={handleSubmit}
      initialData={initialData}
    />
  )
}
