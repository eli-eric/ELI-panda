import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { useIsFirstRender } from 'usehooks-ts'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { CatalogueContext } from '@/pages/catalogue/[uid]'
import { useFormControlStore } from '@/store/useFormControlStore'

import { CatalogueFilterForm } from './form/CatalogueFilter.form'

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

export const CatalogueFilterButtonContainer = () => {
  const [open, setOpen] = useState(false)
  const tableId = 'catalogueItems'

  const defValues = useMemo<CatalogueItem>(
    () => ({
      name: '',
      category: null,
      catalogueNumber: '',
      manufacturerUrl: '',
      supplier: null,
      description: ''
    }),
    []
  )
  const formMethods = useFormFilter<SystemFilterType>({
    tableId,
    defValues,
    enableQueryURL: true
  })

  const { storeFilters, setColumnFilters } = useFormFilterState({ tableId, enableQueryUrl: true })
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
  const { toggleDeleteCustom, customFieldIdToSync } = useFormControlStore()

  const category = formMethods.watch('category')
  const { uid } = useContext(CatalogueContext)
  const { catalogueCategoryProperties } = useCategoryProperties(category?.uid || uid)
  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (isFirstRender) {
      return
    }
    if (catalogueCategoryProperties?.filter(prop => customFieldIdToSync.has(prop.property.uid)).length === 0) {
      toggleDeleteCustom()
    }
    // eslint-disable-next-line
  }, [catalogueCategoryProperties, toggleDeleteCustom, isFirstRender])

  useEffect(() => {
    if (isFirstRender) {
      return
    }
    if (!catalogueCategoryProperties && !category) {
      toggleDeleteCustom()
    }
  }, [catalogueCategoryProperties, category, toggleDeleteCustom, isFirstRender])

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
            enableQueryURL={true}
            resetForm={formMethods.reset}
            defaulFormValues={defValues}
          />
        }
        panelTitle="System Filters"
        open={open}
        setOpen={setOpen}
        buttons={buttons}
      >
        <Form formMethods={formMethods}>
          <CatalogueFilterForm tableId={tableId} catalogueCategoryProperties={catalogueCategoryProperties} />
        </Form>
      </SlideOver>
    </Fragment>
  )
}
