import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { FormModal } from '@/hooks/form/useFormModal'

import { useSystems } from '../systems/hooks/useSystems'
import { SystemsContainer } from '../systems/Systems.cont'
import type { SystemDetail } from '../systems/types/responses'
import { addSubsystem, filterSubsystem } from '../systems/utils'
import { SystemMovingForm } from './form/SystemMoving.form'
import type { SystemsMovingType } from './types/systemMoving'

export const SystemsMovingContainer = () => {
  const [open, setOpen] = useState(false)
  const tableIdLeft = 'systems-left'
  const tableIdRight = 'systems-right'

  const [childSystem, setChildSystem] = useState<SystemsMovingType>()
  const systemsLeft = useSystems(tableIdLeft)
  const systemsRight = useSystems(tableIdRight)

  const [parentSystem, setParentSystem] = useState<SystemsMovingType | undefined>()

  const formMethods = useForm<SystemsMovingType>({ defaultValues: childSystem })
  const { setValue, reset } = formMethods

  const onDropHandler = (from: SystemsMovingType, to: SystemsMovingType) => {
    const isNotAllowedToMove = to.parentPath?.some(parent => parent.uid === from.uid) || from.uid === to.uid || false
    if (isNotAllowedToMove) {
      toast.error('System cannot be moved under itself or its sub-systems')
      return
    }
    setParentSystem(to)
    setChildSystem(from)
    setOpen(true)
  }

  const { system: systemEndpoint } = useEndpoint({ uid: childSystem?.uid })

  const { submit } = useSubmit({
    endpoint: systemEndpoint,
    method: 'put',
    onSuccess: () => {
      if (parentSystem?.tableId === childSystem?.tableId && childSystem) {
        if (parentSystem?.tableId === tableIdLeft) {
          if (!systemsLeft.query.query.search) {
            systemsLeft.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
          }
          if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
            systemsLeft.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
              revalidate: false
            })
          }
        }
        if (parentSystem?.tableId === tableIdRight) {
          if (!systemsRight.query.query.search) {
            systemsRight.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
          }
          if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
            systemsRight.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
              revalidate: false
            })
          }
        }
        return
      }
      if (parentSystem?.tableId === tableIdLeft && childSystem) {
        if (!systemsRight.query.query.search) {
          systemsRight.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
        }
        if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
          systemsLeft.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
            revalidate: false
          })
        }
        return
      }
      if (parentSystem?.tableId === tableIdRight && childSystem) {
        if (!systemsLeft.query.query.search) {
          systemsLeft.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
        }
        if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
          systemsRight.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
            revalidate: false
          })
        }
        return
      }
      toast.success('System moved')
    }
  })

  useEffect(() => {
    reset()
    if (childSystem) {
      for (const field in childSystem) {
        setValue(field as keyof SystemsMovingType, childSystem[field])
      }
    }
  }, [childSystem, setValue, reset])

  return (
    <div className="grid grid-cols-2">
      <SystemsContainer
        tableId={tableIdLeft}
        hideButtons={false}
        enableDragAndDrop={true}
        className="border-r-4 border-gray-400"
        dropSettings={{ onDropHandler: onDropHandler, accept: 'system' }}
        enableQueryURL={false}
      />
      <SystemsContainer
        tableId={tableIdRight}
        hideButtons={false}
        enableDragAndDrop={true}
        dropSettings={{ onDropHandler: onDropHandler, accept: 'system' }}
        enableQueryURL={false}
      />
      <FormModal
        formMethods={formMethods}
        onSubmit={(data: SystemDetail) => {
          submit({ ...data, uid: childSystem?.uid, parentUid: parentSystem?.uid })
        }}
        open={open}
        setOpen={setOpen}
      >
        <SystemMovingForm parentPath={parentSystem?.parentPath} />
      </FormModal>
    </div>
  )
}
