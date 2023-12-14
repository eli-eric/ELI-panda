import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { mutate } from 'swr'

import { MinusButton, PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { FormModal } from '@/hooks/form/useFormModal'
import { classNames } from '@/utils'
import { whereC, whereN } from '@/utils/graphql/mutations'

import { useSystems } from '../systems/hooks/useSystems'
import { SystemsContainer } from '../systems/Systems.cont'
import type { SystemDetail } from '../systems/types/responses'
import { addSubsystem, filterSubsystem } from '../systems/utils'
import { SystemMovingForm } from './form/SystemMoving.form'
import { useSystemMutation } from './hooks/useSystemMutate'

interface SystemsMovingType extends SystemDetail {
  tableId: string
}

export type SystemMovingFormType = {
  name: string
  systemAlias?: string
  description?: string
  responsible?: CodebookType
  zone?: CodebookType
  location?: CodebookType
}

export const SystemsMovingContainer = () => {
  const [open, setOpen] = useState(false)
  const tableIdLeft = 'systems-left'
  const tableIdRight = 'systems-right'

  const [childSystem, setChildSystem] = useState<SystemsMovingType>()
  const systemsLeft = useSystems(tableIdLeft)
  const systemsRight = useSystems(tableIdRight)

  const [parentSystem, setParentSystem] = useState<SystemsMovingType | undefined>()
  const { systemSubsystems: moveToParentKey } = useEndpoint({ uid: parentSystem?.uid || '' })
  const { systemSubsystems: moveFromParentKey } = useEndpoint({ uid: childSystem?.parentUid || '' })

  const formMethods = useForm<SystemMovingFormType>()
  const { setValue, reset } = formMethods

  const onDropHandler = (from: SystemsMovingType, to: SystemsMovingType) => {
    const isNotAllowedToMove = to.parentPath?.some(parent => parent.uid === from.uid) || from.uid === to.uid || false
    if (isNotAllowedToMove) {
      toast.error('System cannot be moved under itself or its sub-systems')
      return
    }
    setChildSystem(from)
    setParentSystem(to)
    setOpen(true)
  }

  const onSuccess = async () => {
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

    const currentAction = systemActions[parentSystem?.tableId as keyof typeof systemActions]
    const isSameTable = parentSystem?.tableId === childSystem?.tableId

    if (!currentAction || !childSystem) {
      return
    }

    const mutateSubsystem = (system, method) => {
      if (!system.query.query.search) {
        system.mutate(prev => prev && method(childSystem.uid, prev), { revalidate: false })
      }
      parentSystem &&
        system.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), { revalidate: false })
    }

    await mutate(moveToParentKey, data => data && [...data, childSystem], { revalidate: false })
    await mutate(moveFromParentKey, data => data && data.filter(system => system.uid !== childSystem.uid), {
      revalidate: false
    })

    if (isSameTable) {
      mutateSubsystem(currentAction.oppositeSystems, filterSubsystem)
    } else {
      mutateSubsystem(currentAction.systems, filterSubsystem)
    }

    toast.success(`System ${childSystem.name} was moved under ${parentSystem?.name}`)
  }

  const { update } = useSystemMutation()

  const updateSystem = (data: SystemMovingFormType) => {
    update({
      variables: {
        where: { uid: childSystem?.uid },
        update: {
          name: data.name,
          systemAlias: data.systemAlias,
          parentSystem: {
            disconnect: whereN(childSystem?.parentUid),
            connect: whereN(parentSystem?.uid)
          },
          location: {
            connect: data.location?.uid ? whereC(data.location?.uid) : undefined,
            disconnect: childSystem?.location?.uid ? whereC(childSystem?.location?.uid) : undefined
          },
          responsible: {
            connect: data.responsible?.uid ? whereN(data.responsible?.uid) : undefined,
            disconnect: childSystem?.responsible?.uid ? whereN(childSystem?.responsible?.uid) : undefined
          },
          zone: {
            connect: data.zone?.uid ? whereN(data.zone?.uid) : undefined,
            disconnect: childSystem?.zone?.uid ? whereN(childSystem?.zone?.uid) : undefined
          }
        }
      },
      onCompleted: () => {
        onSuccess()
      }
    })
  }

  useEffect(() => {
    reset()
    setValue('name', childSystem?.name || '')
    setValue('systemAlias', childSystem?.systemAlias)
    setValue('description', childSystem?.description)
    setValue('responsible', childSystem?.responsible)
    setValue('zone', childSystem?.zone)
    setValue('location', childSystem?.location)
  }, [childSystem, setValue, reset])

  const [showLeft, setShowLeft] = useState(true)
  const toggleLeft = useCallback(() => setShowLeft(!showLeft), [showLeft])

  const [showRight, setShowRight] = useState(true)
  const toggleRight = useCallback(() => setShowRight(!showRight), [showRight])

  return (
    <Fragment>
      <div className={classNames('grid', showLeft && showRight ? 'grid-cols-2' : 'grid-cols-1')}>
        {showLeft && (
          <SystemsContainer
            tableId={tableIdLeft}
            hideButtons={false}
            enableDragAndDrop={true}
            className="border-r-4 border-gray-400"
            dropSettings={{ onDropHandler: onDropHandler, accept: 'system' }}
            enableQueryURL={false}
            RightSearchBarElement={() =>
              showRight ? (
                <Tooltip content="Hide systems window">
                  <div>
                    <MinusButton onClick={toggleLeft} />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip content="Show systems window">
                  <div>
                    <PlusButton onClick={toggleRight} />
                  </div>
                </Tooltip>
              )
            }
          />
        )}
        {showRight && (
          <SystemsContainer
            tableId={tableIdRight}
            hideButtons={false}
            enableDragAndDrop={true}
            dropSettings={{ onDropHandler: onDropHandler, accept: 'system' }}
            enableQueryURL={false}
            RightSearchBarElement={() =>
              showLeft ? (
                <Tooltip content="Hide systems window">
                  <div>
                    <MinusButton onClick={toggleRight} />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip content="Show systems window">
                  <div>
                    <PlusButton onClick={toggleLeft} />
                  </div>
                </Tooltip>
              )
            }
          />
        )}
      </div>

      <FormModal
        formMethods={formMethods}
        onSubmit={(data: SystemMovingFormType) => {
          updateSystem(data)
        }}
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
    </Fragment>
  )
}
