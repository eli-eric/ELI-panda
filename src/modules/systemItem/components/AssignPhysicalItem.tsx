import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { Button as UIButton } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'

const messages = message.common.buttons

function openAssignPhysicalItemModal() {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useModalGlobalStore.getState()

  openModal('dialog1', {
    component: () => <AssignPhysicalItemModalContent />,
    props: {
      title: 'Assign Physical Item',
      size: 'l' as const
    }
  })
}

const AssignPhysicalItemModalContent = () => {
  const { selectedPhysicalSystem, setSelectedPhysicalSystem } =
    useSystemItemStore()
  const { setValue } = useFormContext<SystemDetailFormType>()
  const { closeModal } = useModalGlobalStore()

  const handleAssign = () => {
    if (selectedPhysicalSystem?.physicalItem) {
      setValue('physicalItem', selectedPhysicalSystem?.physicalItem, {
        shouldDirty: true
      })
      closeModal('dialog1')
    } else {
      toast.error('This system does not have a physical item')
    }
  }

  return (
    <div className="space-y-4">
      <SystemsTable
        tableId={'systemsItem'}
        collapseOnUnMount={true}
        settings={{ enableQueryURL: false, enableColumnHiding: true }}
        pageSizeDefault={10}
        className={'overflow-y-auto relative h-[423px]'}
        getRowProps={({ original }) => ({
          onClick: () => {
            if (original?.physicalItem) setSelectedPhysicalSystem(original)
          },
          className: cn(
            selectedPhysicalSystem?.uid === original.uid
              ? 'bg-orange-200 hover:bg-orange-200 dark:hover:bg-orange-600 dark:bg-orange-600'
              : '',
            original?.physicalItem && 'cursor-pointer',
            original?.physicalItem &&
              'font-bold text-gray-700 dark:text-gray-200'
          )
        })}
        hideButtons
      />
      <div className="flex justify-end gap-2">
        <UIButton variant="outline" onClick={() => closeModal('dialog1')}>
          {messages.cancel}
        </UIButton>
        <UIButton
          onClick={handleAssign}
          disabled={!selectedPhysicalSystem?.physicalItem}
        >
          {messages.continue}
        </UIButton>
      </div>
    </div>
  )
}

export const AssignPhysicalItem = () => {
  return (
    <Fragment>
      <Button
        className="mt-4 max-h-10"
        type="button"
        onClick={openAssignPhysicalItemModal}
      >
        {'Assign Physical Item'}
      </Button>
    </Fragment>
  )
}
