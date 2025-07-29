import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'

import { OrdersFilter } from './OrdersFilter'

type OrderFilterType = {
  name: string
  orderNumber: string
  requestNumber: string
  contractNumber: string
  supplier: string
  requestor: string
  procurementResponsible: string
  orderStatus: string[]
  notes: string
  orderDate: string
  lastUpdateTime: string
  lastUpdateBy: string
}

export const OrderFilterButton = () => {
  const [open, setOpen] = useState(false)
  const tableId = 'orders'

  const defValues = useMemo<OrderFilterType>(
    () => ({
      name: '',
      orderNumber: '',
      requestNumber: '',
      contractNumber: '',
      supplier: '',
      requestor: '',
      procurementResponsible: '',
      orderStatus: [],
      notes: '',
      orderDate: '',
      lastUpdateTime: '',
      lastUpdateBy: ''
    }),
    []
  )
  const formMethods = useFormFilter<OrderFilterType>({
    tableId,
    defValues,
    enableQueryURL: true
  })

  const { storeFilters, setColumnFilters } = useFormFilterState({
    tableId,
    enableQueryUrl: true
  })
  const { reset } = formMethods

  const onClear = () => {
    reset(defValues, { keepValues: false })
  }

  const buttons: SlideOverButtons = {
    goNext: {
      type: 'button',
      className: 'w-full justify-center',
      text: 'Clear filters',
      onClick: () => {
        onClear()
        setColumnFilters([])
      }
    }
  }
  return (
    <Fragment>
      <Tooltip
        content={storeFilters.length > 0 ? 'Filters Applied' : 'Open Filters'}
      >
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          {storeFilters.length > 0 ? (
            <FunnelIconFull className="h-4 w-4" aria-hidden="true" />
          ) : (
            <FunnelIconEmpty className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </Tooltip>
      <SlideOver
        RenderSettings={
          <FilterSaveSettings
            tableId={tableId}
            enableQueryURL={true}
            resetForm={formMethods.reset}
            defaulFormValues={defValues}
          />
        }
        panelTitle="Orders Filters"
        open={open}
        setOpen={setOpen}
        buttons={buttons}
      >
        <Form formMethods={formMethods}>
          <OrdersFilter />
        </Form>
      </SlideOver>
    </Fragment>
  )
}
