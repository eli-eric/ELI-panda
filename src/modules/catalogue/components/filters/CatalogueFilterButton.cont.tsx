import { FunnelIcon as FunnelIconEmpty } from '@heroicons/react/24/outline'
import { FunnelIcon as FunnelIconFull } from '@heroicons/react/24/solid'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import type { SlideOverButtons } from '@/components/overlays/slideover/SlideOver'
import { SlideOver } from '@/components/overlays/slideover/SlideOver'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { CatalogueContext } from '@/pages/catalogue/[uid]'

import { useCategory } from '../../hooks/useCategory'
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
    defValues
  })

  const { storeFilters, setColumnFilters } = useFormFilterState({ tableId })
  const { reset, setValue } = formMethods

  const onClear = () => {
    reset(defValues, { keepValues: false })
  }
  const { uid } = useContext(CatalogueContext)

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
  const { catalogueCategoryProperties } = useCategoryProperties(uid)
  const { catalogueCategory } = useCategory(uid)

  useEffect(() => {
    if (catalogueCategory) {
      setValue('category', { name: catalogueCategory.name, uid: catalogueCategory.uid })
    }
  }, [catalogueCategory, setValue])

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
          <CatalogueFilterForm tableId={tableId} catalogueCategoryProperties={catalogueCategoryProperties} />
        </SlideOver>
      </Form>
    </Fragment>
  )
}
