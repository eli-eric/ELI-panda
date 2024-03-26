import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'
import { useFormControlStore } from '@/store/useFormControlStore'

import { useMinMaxPrice } from '../../hooks/useMinMaxPrice'
import { SystemsFilterForm } from './form/SystemsFilter.form'

type SystemFilterType = {
  name: string
  systemLevel: string[]
  systemCode: string
  systemAlias: string
  systemType: CodebookType | null
  zone: CodebookType | null
  location: CodebookType | null
  responsible: CodebookType | null
  description: string
  importance: CodebookType | null
  itemUsage: string[]
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
interface Props {
  tableId?: string
  enableQueryURL?: boolean
  panelSlide?: 'left' | 'right'
}
export const SystemFilterButtonContainer = ({ panelSlide, tableId = 'systems', enableQueryURL = true }: Props) => {
  const [open, setOpen] = useState(false)
  const { minMaxPrice } = useMinMaxPrice()

  const defValues = useMemo<SystemFilterType>(
    () => ({
      name: '',
      systemLevel: [],
      systemCode: '',
      systemAlias: '',
      systemType: null,
      zone: null,
      location: null,
      responsible: null,
      description: '',
      importance: null,
      itemUsage: [],
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
    defValues,
    enableQueryURL: enableQueryURL
  })

  const { storeFilters, setColumnFilters } = useFormFilterState({ tableId, enableQueryUrl: enableQueryURL })
  const { reset, watch } = formMethods

  const { toggleDeleteCustom } = useFormControlStore()

  const category = watch('category')

  //set custom field to delete from state and form
  useEffect(() => {
    if (!category) {
      toggleDeleteCustom()
    }
  }, [category, toggleDeleteCustom])

  const buttons: SlideOverButtons = {
    goNext: {
      type: 'button',
      className: 'w-full justify-center',
      text: 'Clear filters',
      onClick: () => {
        reset(defValues, { keepValues: false })
        setColumnFilters([])
      }
    }
  }

  return (
    <Fragment>
      <Button className="mr-1" buttonSize="large" onClick={() => setOpen(true)}>
        {storeFilters.length > 0 ? (
          <FunnelIconFull className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FunnelIconEmpty className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
      <SlideOver
        RenderSettings={
          <FilterSaveSettings
            tableId={tableId}
            enableQueryURL={enableQueryURL}
            resetForm={formMethods.reset}
            defaulFormValues={defValues}
          />
        }
        panelTitle="System Filters"
        panelSlide={panelSlide}
        open={open}
        setOpen={setOpen}
        buttons={buttons}
      >
        <Form className="flex flex-col h-full justify-between" formMethods={formMethods}>
          <SystemsFilterForm tableId={tableId} enableQueryUrl={enableQueryURL} />
        </Form>
      </SlideOver>
    </Fragment>
  )
}
