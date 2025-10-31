import { useMemo } from 'react'

import { Form } from '@/components/form/Form'
import { useFormFilter } from '@/hooks/form/useFormFilters'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

import { CatalogueSelectFilterFooter } from './CatalogueSelectFilterFooter'
import { CatalogueSelectFilterForm } from './CatalogueSelectFilterForm'

type CatalogueFilterType = {
  name: string
  catalogueNumber: string
  manufacturerUrl: string
  supplier: string
  category: CodebookType | null
  description: string
}

interface CatalogueSelectFilterSheetProps {
  tableId: string
  catalogueCategoryProperties?: CatalogueItemDetail[]
}

export const CatalogueSelectFilterSheet = ({
  tableId,
  catalogueCategoryProperties
}: CatalogueSelectFilterSheetProps) => {
  const defValues = useMemo<CatalogueFilterType>(
    () => ({
      name: '',
      catalogueNumber: '',
      manufacturerUrl: '',
      supplier: '',
      category: null,
      description: ''
    }),
    []
  )

  const formMethods = useFormFilter<CatalogueFilterType>({
    tableId,
    defValues,
    enableQueryURL: false
  })

  return (
    <Form
      className="flex flex-col h-full justify-between"
      formMethods={formMethods}
    >
      <CatalogueSelectFilterForm
        tableId={tableId}
        catalogueCategoryProperties={catalogueCategoryProperties}
      />
      <CatalogueSelectFilterFooter
        tableId={tableId}
        resetForm={formMethods.reset}
        defaultFormValues={defValues}
      />
    </Form>
  )
}
