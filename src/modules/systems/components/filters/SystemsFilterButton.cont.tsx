import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

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
}
export const SystemFilterButtonContainer = ({ tableId = 'systems', enableQueryURL = true }: Props) => {
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
  const isFirstRender = useIsFirstRender()

  //set custom field to delete from state and form
  useEffect(() => {
    if (isFirstRender) return
    if (!category) {
      toggleDeleteCustom()
    }
  }, [category, toggleDeleteCustom, isFirstRender])

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
      <Button className="mr-1" buttonSize="large" onClick={() => setOpen(true)}>
        {storeFilters.length > 0 ? (
          <FunnelIconFull className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FunnelIconEmpty className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
      <Form formMethods={formMethods}>
        <SlideOver
          RenderSettings={<FilterSaveSettings tableId={tableId} />}
          panelTitle="System Filters"
          open={open}
          setOpen={setOpen}
          buttons={buttons}
        >
          <div className="flex flex-col h-full justify-between">
            <SystemsFilterForm tableId={tableId} enableQueryUrl={enableQueryURL} />
          </div>
        </SlideOver>
      </Form>
    </Fragment>
  )
}
