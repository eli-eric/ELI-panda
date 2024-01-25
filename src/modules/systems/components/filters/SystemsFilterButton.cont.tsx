import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

import { useMinMaxPrice } from '../../hooks/useMinMaxPrice'
import { SystemsFilterForm } from './form/SystemsFilter.form'

type SystemFilterType = {
  name: string
  systemLevel: CodebookType | null
  systemCode: string
  systemAlias: string
  systemType: CodebookType | null
  zone: CodebookType | null
  location: CodebookType | null
  responsible: CodebookType | null
  description: string
  importance: CodebookType | null
  itemUsage: CodebookType | null
  eun: string
  serialNumber: string
  catalogueName: string
  catalogueNumber: string
  category: CodebookType | null
  catalogueDescription: string
  supplier: CodebookType | null
  price: [number | undefined, number | undefined]
  parentSystem: CodebookType | null
}

export const SystemFilterButtonContainer = () => {
  const [open, setOpen] = useState(false)
  const { minMaxPrice } = useMinMaxPrice()
  const tableId = 'systems'

  const defValues = useMemo<SystemFilterType>(
    () => ({
      name: '',
      systemLevel: null,
      systemCode: '',
      systemAlias: '',
      systemType: null,
      zone: null,
      location: null,
      responsible: null,
      description: '',
      importance: null,
      itemUsage: null,
      eun: '',
      serialNumber: '',
      catalogueName: '',
      catalogueNumber: '',
      category: null,
      catalogueDescription: '',
      supplier: null,
      parentSystem: null,
      price: [minMaxPrice?.min, minMaxPrice?.max]
    }),
    [minMaxPrice]
  )
  const formMethods = useFormFilter<SystemFilterType>({
    tableId,
    defValues
  })

  const { storeFilters, setColumnFilters } = useFormFilterState({ tableId })
  const { reset, control } = formMethods

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

  const category = useMemo(() => storeFilters.find(filter => filter.id === 'category'), [storeFilters])

  const { setFieldIdToSync } = useFormControlStore()
  /*
  useEffect(() => {
    storeFilters.forEach(filter => {
      if (filter.type === 'catalogue_prop') {
        setFieldIdToSync(filter.id)
      }
    })
  }, [category, storeFilters, setFieldIdToSync]) */

  return (
    <Fragment>
      <Button className="mr-1" buttonSize="large" onClick={() => setOpen(true)}>
        {storeFilters.length > 0 ? (
          <FunnelIconFull className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FunnelIconEmpty className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
      <Form formMethods={formMethods}>
        <SlideOver panelTitle="System Filters" open={open} setOpen={setOpen} buttons={buttons}>
          <SystemsFilterForm tableId={tableId} />
        </SlideOver>
      </Form>
    </Fragment>
  )
}
