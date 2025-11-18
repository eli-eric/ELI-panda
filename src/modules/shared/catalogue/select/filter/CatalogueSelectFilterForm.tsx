import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/inputs'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { cn } from '@/lib/utils'
import useCatalogueFormFields from '@/modules/catalogueItem/components/form/CatalogueForm.fields'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { CategoryPropFilters } from '@/modules/shared/form/CategoryPropFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

interface CatalogueSelectFilterFormProps {
  tableId: string
  catalogueCategoryProperties?: CatalogueItemDetail[]
}

export const CatalogueSelectFilterForm = ({
  tableId,
  catalogueCategoryProperties
}: CatalogueSelectFilterFormProps) => {
  const fields = useCatalogueFormFields()
  const { setFilter } = useFormFilterState({ tableId, enableQueryUrl: false })
  const { toggleDeleteCustom } = useFormControlStore()

  return (
    <div className={cn('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
      <div className="flex flex-col gap-2">
        <Input
          {...fields.name}
          disabled={false}
          onChange={setFilter(fields.name.name)}
          isFilter={true}
        />
        <Input
          {...fields.catalogueNumber}
          disabled={false}
          onChange={setFilter(fields.catalogueNumber.name)}
          isFilter={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          {...fields.manufacturerUrl}
          disabled={false}
          onChange={setFilter(fields.manufacturerUrl.name)}
          isFilter={true}
        />
        <Input
          {...fields.supplier}
          disabled={false}
          onChange={setFilter(fields.supplier.name)}
          isFilter={true}
        />
      </div>
      <Input
        {...fields.itemUID}
        onChange={setFilter(fields.itemUID.name)}
        isFilter={true}
      />

      <ComboboxTree
        {...fields.category}
        disabled={false}
        customLabel="Category"
        className="col-span-2"
        onSelect={v => {
          // Add to store columnFilter so filtering works
          setFilter(fields.category.name)(
            v?.uid ? v : null,
            undefined,
            'Category'
          )
          if (!v) {
            toggleDeleteCustom()
          }
        }}
        isFilter={true}
      />

      <Input
        {...fields.description}
        disabled={false}
        className="col-span-2"
        onChange={setFilter(fields.description.name)}
        isFilter={true}
      />
      <CategoryPropFilters
        tableId={tableId}
        catalogueCategoryProperties={catalogueCategoryProperties}
        enableQueryUrl={false}
      />
    </div>
  )
}
