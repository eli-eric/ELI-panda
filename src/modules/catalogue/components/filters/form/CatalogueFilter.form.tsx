import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input, TextArea } from '@/components/form/Input'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import useCatalogueFormFields from '@/modules/catalogueItem/components/form/CatalogueForm.fields'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { CategoryPropFilters } from '@/modules/systems/components/filters/form/CategoryPropFilters'
import { classNames } from '@/utils'

interface CatalogueFilterFormProps {
  tableId: string
  catalogueCategoryProperties?: CatalogueItemDetail[]
}

export const CatalogueFilterForm = ({ tableId, catalogueCategoryProperties }: CatalogueFilterFormProps) => {
  const fields = useCatalogueFormFields()

  const { setFilter } = useFormFilterState({ tableId })

  return (
    <div className={classNames('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
      <div className="flex flex-col gap-2">
        <Input {...fields.name} onChange={setFilter(fields.name.name)} isFilter={true} />
        <Input {...fields.catalogueNumber} onChange={setFilter(fields.catalogueNumber.name)} isFilter={true} />
      </div>
      <div className="flex flex-col gap-2">
        <Input {...fields.manufacturerUrl} onChange={setFilter(fields.manufacturerUrl.name)} isFilter={true} />
        <Input {...fields.supplier} onChange={setFilter(fields.supplier.name)} isFilter={true} />
      </div>
      <ComboboxTree {...fields.category} onSelect={setFilter(fields.category.name)} isFilter={true} />

      <TextArea
        {...fields.description}
        className="col-span-2"
        onChange={setFilter(fields.description.name)}
        isFilter={true}
      />
      <CategoryPropFilters tableId={tableId} catalogueCategoryProperties={catalogueCategoryProperties} />
    </div>
  )
}
