import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { ModalButtons } from '@/types/form'

import { useSystemItemStore } from '../store/useSystemItemStore'
import type { SystemDetailFormType } from '../types/form'

const messages = message.common.buttons

export const AssignPhysicalItem = () => {
  const [openModal, setOpenModal] = useState(false)
  const { selectedPhysicalSystem, setSelectedPhysicalSystem } =
    useSystemItemStore()
  const { setValue } = useFormContext<SystemDetailFormType>()

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.continue,
      onClick: () => {
        if (selectedPhysicalSystem?.physicalItem) {
          setValue('physicalItem', selectedPhysicalSystem?.physicalItem, {
            shouldDirty: true
          })
          setOpenModal(false)
        } else {
          toast.error('This system does not have a physical item')
        }
      }
    },
    goBack: {
      text: messages.cancel,
      onClick: () => {
        setOpenModal(false)
      }
    }
  }

  return (
    <Fragment>
      <Button
        primary
        className="mt-4 max-h-10"
        type="button"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        {'Assign Physical Item'}
      </Button>
      <ModalComponent
        open={openModal}
        setOpen={setOpenModal}
        buttons={modalButtons}
      >
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
            className: classNames(
              selectedPhysicalSystem?.uid === original.uid
                ? 'bg-primary-200 hover:bg-primary-200 dark:hover:bg-primary-600 dark:bg-primary-600'
                : '',
              original?.physicalItem && 'cursor-pointer',
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200'
            )
          })}
          hideButtons
        />
      </ModalComponent>
    </Fragment>
  )
}
