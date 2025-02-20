import { Fragment, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import { cx } from '@/utils'

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

  const table = usePandaTable<any>({
    columns: sereviceLinesColumns,
    data: serviceLines,
    tableId: 'orderLines',
    settings: {
      enableFooter: true,
      enableFiltering: true,
      manualFiltering: false,
      enableQueryURL: false,
      enableSorting: true,
      manualSorting: false,
      defaultColumnOrder: [
        'name',
        'partNumber',
        'serialNumber',
        'eun',
        'isDelivered'
      ]
    }
  })

  const handleAddServiceLine = () => {
    setOpenServiceLineForm(true)
  }

  return (
    <Fragment>
      <Heading text={messages.head}>
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
      {serviceLines?.length && (
        <div className="flex flex-col max-h-[500px] mb-5">
          <PandaTableControlled
            data={serviceLines}
            table={table}
            tableId={'serviceLines'}
            className={'relative overflow-x-auto'}
            getRowProps={({ original: { isDelivered } }) => ({
              className: cx(
                isDelivered
                  ? 'bg-green-100 dark:bg-green-700'
                  : 'bg-white dark:bg-gray-800'
              )
            })}
            settings={{
              enableFooter: true,
              enableFiltering: true,
              manualFiltering: false,
              enableQueryURL: false,
              enableSorting: true,
              manualSorting: false
            }}
          />
        </div>
      )}
      <ModalComponent
        open={openServiceLineForm}
        setOpen={setOpenServiceLineForm}
      >
        <ServiceLineWizard />
      </ModalComponent>
    </Fragment>
  )
}
