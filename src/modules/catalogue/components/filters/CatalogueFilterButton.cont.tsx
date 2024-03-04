'use client'
import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useMemo, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useIsFirstRender } from 'usehooks-ts'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { FilterSaveSettings } from '@/modules/shared/filters/FilterSaveSettings'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { useFormControlStore } from '@/store/useFormControlStore'

import { CatalogueFilterForm } from './form/CatalogueFilter.form'

interface CatalogueFilterButtonContainerProps {
  filterFormMethods: UseFormReturn<any, any, any>
}

export const CatalogueFilterButtonContainer = ({ filterFormMethods }: CatalogueFilterButtonContainerProps) => {
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
  const { reset, watch } = filterFormMethods

  const { storeFilters, setColumnFilters } = useFormFilterState({ tableId, enableQueryUrl: true })

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

  const category = watch('category')
  const { catalogueCategoryProperties } = useCategoryProperties(category?.uid)
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
          <FilterSaveSettings tableId={tableId} enableQueryURL={true} resetForm={reset} defaulFormValues={defValues} />
        }
        panelTitle="System Filters"
        open={open}
        setOpen={setOpen}
        buttons={buttons}
      >
        <Form formMethods={filterFormMethods}>
          <CatalogueFilterForm tableId={tableId} catalogueCategoryProperties={catalogueCategoryProperties} />
        </Form>
      </SlideOver>
    </Fragment>
  )
}
