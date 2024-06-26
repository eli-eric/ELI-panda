import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { FormModal } from '@/hooks/form/useFormModal'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import {
  addSubsystem,
  filterSubsystem,
  filterSubsystemFromSubsystems
} from '@/modules/systems/utils'
import type { SystemDetail } from '@/types/responses/systems'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { useSystemMutation } from '../hooks/useSystemMutate'
import { useSystemMovingStore } from '../store/useSystemMovingStore'
import type { SystemMovingFormType } from '../SystemsMoving.cont'
import { SystemMovingForm } from './SystemMoving.form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const SystemMovingModal = ({ open, setOpen }: Props) => {
  const formMethods = useForm<SystemMovingFormType>()
  const { setValue, reset } = formMethods

  const { parentSystem, childSystem, tableIdLeft, tableIdRight, clear } =
    useSystemMovingStore()

  const systemsLeft = useSystems(tableIdLeft)
  const systemsRight = useSystems(tableIdRight)

  const queryClient = useQueryClient()

  const childParentUid =
    childSystem?.parentPath &&
    childSystem?.parentPath[childSystem?.parentPath?.length - 1].uid

  const { update } = useSystemMutation()

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
      const isSameTable = parentSystem?.tableId === childSystem?.tableId

      if (!currentAction || !childSystem) {
        return
      }

      queryClient.setQueryData<SystemDetail[]>(
        ['subsystems', { uid: parentSystem?.uid }],
        prev => {
          if (prev) {
            const newSubsystems = [...prev] // Create a copy of the previous array
            newSubsystems.push(childSystem) // Add the childSystem to the new array
            return newSubsystems // Return the new array
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
      clear
    ]
  )

  useEffect(() => {
    reset()
    setValue('name', childSystem?.name || '')
    setValue('systemAlias', childSystem?.systemAlias)
    setValue('description', childSystem?.description)
    setValue('responsible', childSystem?.responsible)
    setValue('zone', childSystem?.zone)
    setValue('location', childSystem?.location)
    setValue('systemType', childSystem?.systemType)
    setValue('systemCode', childSystem?.systemCode)
  }, [childSystem, setValue, reset])

  const updateSystem = useCallback(
    (data: SystemMovingFormType) => {
      update(
        {
          where: { uid: childSystem?.uid },
          update: {
            name: data.name,
            systemAlias: data.systemAlias,
            parentSystem: {
              disconnect: whereN(childParentUid),
              connect: whereN(parentSystem?.uid)
            },
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
          },
          systemFromUid: childParentUid,
          systemUid: childSystem?.uid
        },
        {
          onSuccess: () => {
            onSuccess(data)
          }
        }
      )
    },
    [childSystem, childParentUid, parentSystem, update, onSuccess]
  )

  return (
    <FormModal
      formMethods={formMethods}
      onSubmit={updateSystem}
      open={open}
      setOpen={setOpen}
    >
      <SystemMovingForm
        parentPath={[
          ...(parentSystem?.parentPath || []),
          { name: parentSystem?.name || '', uid: parentSystem?.uid || '' }
        ]}
      />
    </FormModal>
  )
}
