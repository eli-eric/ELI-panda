import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { FormModal } from '@/hooks/form/useFormModal'

import { SystemsTable } from '../systems/components/table/Systems.table'
import { useSystems } from '../systems/hooks/useSystems'
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
    const isNotAllowedToMove = to.parentPath?.some(parent => parent.uid === from.uid) || false
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
          systemsLeft.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
          if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
            systemsLeft.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
              revalidate: false
            })
          }
        }
        if (parentSystem?.tableId === tableIdRight) {
          systemsRight.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
          if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
            systemsRight.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
              revalidate: false
            })
          }
        }
      }
      if (parentSystem?.tableId === tableIdLeft && childSystem) {
        systemsRight.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
        if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
          systemsLeft.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
            revalidate: false
          })
        }
      }
      if (parentSystem?.tableId === tableIdRight && childSystem) {
        systemsLeft.mutate(prev => prev && filterSubsystem(childSystem.uid, prev), { revalidate: false })
        if (parentSystem.subSystems && parentSystem.subSystems?.length > 0) {
          systemsRight.mutate(prev => prev && addSubsystem(parentSystem.uid, childSystem, prev), {
            revalidate: false
          })
        }
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
      <TableLayoutContainer className="border-r-4">
        <SystemsTable
          hideButtons={true}
          enableDragAndDrop={true}
          tableId={tableIdLeft}
          pageSizeDefault={50}
          className={'relative overflow-scroll'}
          getRowProps={({ original }) => ({
            className: classNames(original?.physicalItem && 'font-bold text-gray-700'),
            dropSettings: { onDropHandler: onDropHandler, accept: 'system' }
          })}
          settings={{
            enableSorting: true,
            enableColumnHiding: true,
            enableQueryURL: false,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
      <TableLayoutContainer>
        <SystemsTable
          hideButtons={true}
          enableDragAndDrop={true}
          tableId={tableIdRight}
          pageSizeDefault={50}
          className={'relative overflow-scroll'}
          getRowProps={({ original }) => ({
            className: classNames(original?.physicalItem && 'font-bold text-gray-700'),
            dropSettings: { onDropHandler: onDropHandler, accept: 'system' }
          })}
          settings={{
            enableSorting: true,
            enableColumnHiding: true,
            enableQueryURL: false,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
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
