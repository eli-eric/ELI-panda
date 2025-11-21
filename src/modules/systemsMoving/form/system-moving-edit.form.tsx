import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { message } from '@/i18n/src/messages'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import {
  addSubsystem,
  filterSubsystem,
  filterSubsystemFromSubsystems
} from '@/modules/systems/utils'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { ROLE } from '@/types/constants/roles'
import type { SystemDetail } from '@/types/responses/systems'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { useSystemMutation } from '../hooks/useSystemMutate'
import { useSystemMovingStore } from '../store/useSystemMovingStore'
import type { SystemMovingFormType } from '../SystemsMoving.cont'
import { SystemMovingForm } from './SystemMoving.form'

interface SystemsMovingType extends SystemDetail {
  tableId: string
}

interface SystemMovingEditFormProps {
  childSystem: SystemsMovingType
  parentSystem: SystemsMovingType
  onClose?: () => void
}

export const SystemMovingEditForm = ({
  childSystem,
  parentSystem,
  onClose
}: SystemMovingEditFormProps) => {
  const { formatMessage: fm } = useIntl()
  const formMethods = useForm<SystemMovingFormType>()
  const { setValue, reset, formState } = formMethods

  const { tableIdLeft, tableIdRight, clear } = useSystemMovingStore()

  const systemsLeft = useSystems(tableIdLeft)
  const systemsRight = useSystems(tableIdRight)

  const queryClient = useQueryClient()
  const { closeModal } = useDynamicModalStore()

  const childParentUid =
    childSystem?.parentPath &&
    childSystem?.parentPath[childSystem?.parentPath?.length - 1].uid

  const { update, moveSystem, loading } = useSystemMutation()

  const mutateSubsystem = useCallback(
    (system, method, formData) => {
      if (!childSystem?.uid) return
      if (!system.query.search) {
        system.mutate(prev => prev && method(childSystem?.uid, prev), {
          revalidate: false
        })
      }
      const newParentPath = [
        { uid: parentSystem?.uid, name: parentSystem?.name }
      ]
      parentSystem &&
        system.mutate(
          prev =>
            prev &&
            parentSystem.subSystems &&
            addSubsystem(
              parentSystem.uid,
              { ...childSystem, ...formData, parentPath: newParentPath },
              prev
            ),
          {
            revalidate: false
          }
        )
    },
    [childSystem, parentSystem]
  )

  const onSuccess = useCallback(
    (formData: SystemMovingFormType) => {
      const systemActions = {
        [tableIdLeft]: {
          systems: systemsLeft,
          oppositeSystems: systemsRight
        },
        [tableIdRight]: {
          systems: systemsRight,
          oppositeSystems: systemsLeft
        }
      }
      const currentAction =
        systemActions[parentSystem?.tableId as keyof typeof systemActions]

      if (!currentAction || !childSystem) {
        return
      }

      queryClient.setQueryData<SystemDetail[]>(
        ['subsystems', { uid: parentSystem?.uid }],
        prev => {
          if (prev) {
            const newSubsystems = [...prev]
            newSubsystems.push(childSystem)
            return newSubsystems
          }
          return prev
        }
      )

      queryClient.setQueryData<SystemDetail[]>(
        ['subsystems', { uid: childParentUid }],
        prev => {
          if (prev) {
            return filterSubsystemFromSubsystems(childSystem.uid, prev)
          }
          return prev
        }
      )

      mutateSubsystem(currentAction.oppositeSystems, filterSubsystem, formData)

      mutateSubsystem(currentAction.systems, filterSubsystem, formData)

      toast.success(
        `System ${childSystem.name} was moved under ${parentSystem?.name}`
      )
      clear()
      closeModal('system-moving-dialog')
    },
    [
      childSystem,
      parentSystem,
      systemsLeft,
      systemsRight,
      tableIdLeft,
      tableIdRight,
      childParentUid,
      queryClient,
      mutateSubsystem,
      clear,
      closeModal
    ]
  )

  useEffect(() => {
    reset()
    setValue('name', childSystem?.name || '')
    setValue('description', childSystem?.description)
    setValue('responsible', childSystem?.responsible)
    setValue('zone', childSystem?.zone)
    setValue('location', childSystem?.location)
    setValue('systemType', childSystem?.systemType)
    setValue('systemCode', childSystem?.systemCode)
  }, [childSystem, setValue, reset])

  const updateSystem = useCallback(
    (data: SystemMovingFormType) => {
      // Step 1: Update system fields (name, location, zone, responsible)
      update(
        {
          where: { uid: childSystem?.uid },
          update: {
            name: data.name,
            location: {
              connect: data.location?.uid
                ? whereC(data.location?.uid)
                : undefined,
              disconnect: childSystem?.location?.uid
                ? whereC(childSystem?.location?.uid)
                : undefined
            },
            responsible: {
              connect: data.responsible?.uid
                ? whereN(data.responsible?.uid)
                : undefined,
              disconnect: childSystem?.responsible?.uid
                ? whereN(childSystem?.responsible?.uid)
                : undefined
            },
            zone: {
              connect: data.zone?.uid ? whereN(data.zone?.uid) : undefined,
              disconnect: childSystem?.zone?.uid
                ? whereN(childSystem?.zone?.uid)
                : undefined
            }
          }
        },
        {
          onSuccess: () => {
            // Step 2: Move system in hierarchy using custom resolver
            moveSystem(
              {
                systemUid: childSystem?.uid,
                newParentUid: parentSystem?.uid,
                oldParentUid: childParentUid
              },
              {
                onSuccess: () => {
                  onSuccess(data)
                }
              }
            )
          }
        }
      )
    },
    [childSystem, childParentUid, parentSystem, update, moveSystem, onSuccess]
  )

  const handleExit = useCallback(() => {
    reset()
    onClose?.()
  }, [reset, onClose])

  return (
    <div className="space-y-4">
      <Form
        formMethods={formMethods}
        onSubmit={updateSystem}
        enableLeaveWarning={false}
      >
        <SheetFormButtons
          onSubmit={formMethods.handleSubmit(updateSystem)}
          onExit={handleExit}
          editRole={ROLE.SYSTEM_EDIT}
          loading={loading}
          isFormDirty={formState.isDirty}
          saveLabel={fm({ id: message.common.buttons.save })}
          exitLabel={fm({ id: message.common.buttons.exit })}
        />
        <SystemMovingForm
          parentPath={[
            ...(parentSystem?.parentPath || []),
            { name: parentSystem?.name || '', uid: parentSystem?.uid || '' }
          ]}
        />
      </Form>
    </div>
  )
}
