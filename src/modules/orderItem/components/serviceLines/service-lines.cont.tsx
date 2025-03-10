import { useCallback, useMemo, useState } from 'react'
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

  const serviceLinesData = useWatch({ control, name: 'serviceLines' })

  // Memoizujeme data pro lepší výkon
  const serviceLines = useMemo(() => serviceLinesData, [serviceLinesData])

  // Memoizujeme sloupce pro předcházení zbytečným re-renderům
  const serviceLinesColumns = useServiceLinesColumns()
  const [openServiceLineForm, setOpenServiceLineForm] = useState(false)

  // Použijeme useCallback pro funkci handleAddServiceLine
  const handleAddServiceLine = useCallback(() => {
    setOpenServiceLineForm(true)
  }, [])

  // Použijeme useCallback pro funkci setOpen - omezíme zbytečné re-rendery modálního okna
  const handleSetOpen = useCallback((open: boolean) => {
    setOpenServiceLineForm(open)
  }, [])

  // Memoizujeme props pro tabulku, aby nedocházelo k zbytečným re-renderům
  const tableProps = useMemo(
    () => ({
      data: serviceLines,
      className: 'relative overflow-x-auto',
      columns: serviceLinesColumns,
      enablePagination: true,
      enableFiltering: true,
      enableFooter: true,
      enablePinning: true,
      rowClassName: 'group/row',
      getRowProps: ({ isDelivered }: any, index: number) => ({
        className: isDelivered
          ? index % 2 === 0
            ? 'bg-green-200 dark:bg-green-800'
            : 'bg-green-100 dark:bg-green-700'
          : undefined
      })
    }),
    [serviceLines, serviceLinesColumns]
  )

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
      <Table {...tableProps} />
      <ModalComponent
        zclass="z-20"
        open={openServiceLineForm}
        setOpen={handleSetOpen}
      >
        <ServiceLineWizard setOpen={handleSetOpen} />
      </ModalComponent>
    </div>
  )
}
