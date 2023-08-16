import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { SystemDetail } from '@/modules/systems/types/responses'
import type { ModalButtons } from '@/types/form'

import type { SystemDetailFormType } from '../types/form'

const messages = message.common.buttons

export const AssignPhysicalItem = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<SystemDetail>()
  const { setValue, watch, reset, getValues } = useFormContext<SystemDetailFormType>()
  const physicalItem = watch('physicalItem')

  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.continue,
      onClick: () => {
        if (selectedSystem?.physicalItem) {
          setValue('physicalItem', selectedSystem?.physicalItem, { shouldDirty: true })
          setValue('name', selectedSystem?.name, { shouldDirty: true })
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
    },
    alternative: {
      text: messages.addNew,
      onClick: () => {
        reset({
          ...getValues(),
          physicalItem: {
            uid: null,
            currency: '',
            eun: '',
            itemUsage: null,
            price: null,
            serialNumber: '',
            catalogueItem: {
              name: '',
              category: null,
              uid: null,
              supplier: null,
              catalogueNumber: '',
              description: '',
              details: null,
              categoryName: '',
              categoryPath: '',
              manufacturerUrl: ''
            }
          }
        })

        setOpenModal(false)
      }
    }
  }

  return (
    <Fragment>
      <Button
        primary
        buttonSize="large"
        onClick={() => {
          setOpenModal(true)
        }}
      >
        {physicalItem ? 'Change Physical Item' : 'Assign Physical Item'}
      </Button>
      <ModalComponent open={openModal} setOpen={setOpenModal} buttons={modalButtons}>
        <SystemsTable
          tableId={'systemsItem'}
          settings={{ enableQueryURL: false, enableColumnHiding: true }}
          pageSizeDefault={10}
          className={'overflow-y-auto relative h-[423px]'}
          getRowProps={({ original }) => ({
            onClick: () => {
              setSelectedSystem(original)
            },
            className: classNames(
              selectedSystem?.uid === original.uid ? 'bg-primary-200 hover:bg-primary-200' : '',
              'cursor-pointer',
              original?.physicalItem && 'font-bold text-gray-700'
            )
          })}
          hideButtons
        />
      </ModalComponent>
    </Fragment>
  )
}
