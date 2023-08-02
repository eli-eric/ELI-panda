import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { FormModal } from '@/hooks/form/useFormModal'

import { SystemsTable } from '../systems/components/table/Systems.table'
import type { SystemDetail } from '../systems/types/responses'
import { SystemMovingForm } from './form/SystemMoving.form'

export const SystemsMovingContainer = () => {
  const [open, setOpen] = useState(false)
  const [system, setSystem] = useState<SystemDetail>()

  const formMethods = useForm<SystemDetail>({ defaultValues: system })
  const { setValue, reset } = formMethods

  const onDropHandler = (from: SystemDetail, to: SystemDetail) => {
    const { hasSubsystems, physicalItem, subSystems, statistics, parentPath, ...restFrom } = from
    setSystem({ ...restFrom, parentPath: to.parentPath })
    setOpen(true)
  }

  useEffect(() => {
    reset()
    if (system) {
      for (const field in system) {
        setValue(field as keyof SystemDetail, system[field])
      }
      setSystem(undefined)
    }
  }, [system, setValue, reset])

  return (
    <div className="grid grid-cols-2">
      <TableLayoutContainer className="border-r">
        <SystemsTable
          hideButtons={true}
          enableDragAndDrop={true}
          tableId={'systems-from'}
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
          tableId={'systems-to'}
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
        onSubmit={data => {
          console.log('Submit', data)
          //call EP
          //on success mutate systems object with new children
        }}
        open={open}
        setOpen={setOpen}
      >
        <SystemMovingForm />
      </FormModal>
    </div>
  )
}
