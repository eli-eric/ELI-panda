import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { MinusButton, PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { FormModal } from '@/hooks/form/useFormModal'
import { classNames } from '@/utils'

import { useSystems } from '../systems/hooks/useSystems'
import { SystemsContainer } from '../systems/Systems.cont'
import type { SystemDetail } from '../systems/types/responses'
import { addSubsystem, filterSubsystem } from '../systems/utils'
import { SystemMovingForm } from './form/SystemMoving.form'

interface SystemsMovingType extends SystemDetail {
  tableId: string
}

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
    setChildSystem(from)
    setParentSystem(to)
    setOpen(true)
  }

  const { system: systemEndpoint } = useEndpoint({ uid: childSystem?.uid })

  const onSuccess = () => {
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

    if (isSameTable) {
      mutateSubsystem(currentAction.oppositeSystems, filterSubsystem)
    } else {
      mutateSubsystem(currentAction.systems, filterSubsystem)
    }

    toast.success(`System ${childSystem.name} was moved under ${parentSystem?.name}`)
  }

  const { submit } = useSubmit({
    endpoint: systemEndpoint,
    method: 'put',
    onSuccess: onSuccess
  })

  useEffect(() => {
    reset()
    if (childSystem) {
      for (const field in childSystem) {
        setValue(field as keyof SystemsMovingType, childSystem[field])
      }
    }
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
        onSubmit={(data: SystemDetail) => {
          submit({ ...data, uid: childSystem?.uid, parentUid: parentSystem?.uid })
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
