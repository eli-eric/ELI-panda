import { XMarkIcon } from '@heroicons/react/24/outline'

import { Badge } from '@/components/visuals/Badge'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

export const FilterBadges = ({
  tableId,
  additionalBadge
}: {
  tableId: string
  additionalBadge?: JSX.Element
}) => {
  const [filters, setFilters] = useFilters(tableId, true, false)
  const { addFieldIdToSync } = useFormControlStore()
  //render only client

  return (
    <div>
      {(filters.length > 0 || additionalBadge) && (
        <span className="text-sm pr-2 font-medium text-gray-600 dark:text-gray-200">
          Filters:
        </span>
      )}
      {additionalBadge}
      {filters.map(filter => (
        <Badge key={filter.id}>
          <span>{filter.name}</span>
          <XMarkIcon
            className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
            onClick={() => {
              setFilters(filters.filter(f => f.id !== filter.id))
              addFieldIdToSync(filter.id)
            }}
          />
        </Badge>
      ))}
    </div>
  )
}
