import { useQueryState } from 'next-usequerystate'
import { startTransition, useEffect, useMemo } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useIsFirstRender } from 'usehooks-ts'

import { Form } from '@/components/form/Form'
import type { CatalogueItemForm } from '@/modules/catalogueItem/types/responses'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { useFormControlStore } from '@/store/useFormControlStore'
import type { CodebookType } from '@/types/responses/codebook'

import { CatalogueFilterFooter } from './CatalogueFilterFooter.comp'
import { CatalogueFilterForm } from './form/CatalogueFilter.form'

interface CatalogueFilterSheetProps {
  tableId: string
  enableQueryURL: boolean
  filterFormMethods: UseFormReturn<any, any, any>
}

export const CatalogueFilterSheet = ({
  tableId,
  enableQueryURL,
  filterFormMethods
}: CatalogueFilterSheetProps) => {
  const [categoryQuery] = useQueryState('category', { history: 'push' })
  const category: CodebookType | null = categoryQuery
    ? JSON.parse(categoryQuery)
    : null

  const defaultValues = useMemo<CatalogueItemForm>(
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

  const { toggleDeleteCustom, customFieldIdToSync } = useFormControlStore()
  const { catalogueCategoryProperties } = useCategoryProperties(category?.uid)
  const isFirstRender = useIsFirstRender()

  // Handle category property cleanup
  useEffect(() => {
    if (
      catalogueCategoryProperties?.filter(prop =>
        customFieldIdToSync.has(prop.property.uid)
      ).length === 0
    ) {
      startTransition(() => {
        toggleDeleteCustom()
      })
    }
    // eslint-disable-next-line
  }, [catalogueCategoryProperties, toggleDeleteCustom, isFirstRender])

  useEffect(() => {
    if (!catalogueCategoryProperties && !category) {
      startTransition(() => {
        toggleDeleteCustom()
      })
    }
  }, [catalogueCategoryProperties, category, toggleDeleteCustom, isFirstRender])

  return (
    <Form
      className="flex flex-col h-full justify-between"
      formMethods={filterFormMethods}
    >
      <CatalogueFilterForm
        tableId={tableId}
        catalogueCategoryProperties={catalogueCategoryProperties}
      />
      <CatalogueFilterFooter
        tableId={tableId}
        enableQueryURL={enableQueryURL}
        resetForm={filterFormMethods.reset}
        defaultFormValues={defaultValues}
      />
    </Form>
  )
}
