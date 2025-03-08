import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'

import { ServiceLineWizard } from './form/service-line.wizz'
import { useServiceLinesColumns } from './service-lines.columns'

const messages = message.ordersPage.serviceLines

interface OrderLinesTableProps {
  disabledEdit?: boolean
}

export const ServiceLinesContainer = ({
  disabledEdit
}: OrderLinesTableProps) => {
  const { control } = useFormContext()

  const serviceLines = useWatch({ control, name: 'serviceLines' })
  const sereviceLinesColumns = useServiceLinesColumns()
  const [openServiceLineForm, setOpenServiceLineForm] = useState(false)

  const handleAddServiceLine = () => {
    setOpenServiceLineForm(true)
  }

  return (
    <div className="pt-4">
      <Heading text={messages.header} showBorder={false}>
        {!disabledEdit && (
          <div className="flex items-center mr-2">
            <PlusButton
              primary
              type="button"
              buttonSize="large"
              onClick={handleAddServiceLine}
              className="mb-2"
            />
          </div>
        )}
      </Heading>
      <Table
        data={serviceLines}
        className={'relative overflow-x-auto'}
        columns={sereviceLinesColumns}
        enablePagination
        enableFiltering
        enableFooter
        enablePinning
        getRowProps={({ isDelivered }, index) => ({
          className: isDelivered
            ? index % 2 === 0
              ? 'bg-green-200 dark:bg-green-800'
              : 'bg-green-100 dark:bg-green-700'
            : undefined
        })}
      />
      <ModalComponent
        zclass="z-20"
        open={openServiceLineForm}
        setOpen={setOpenServiceLineForm}
      >
        <ServiceLineWizard setOpen={setOpenServiceLineForm} />
      </ModalComponent>
    </div>
  )
}
