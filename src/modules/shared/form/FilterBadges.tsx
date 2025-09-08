import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

export const FilterBadges = ({
  tableId,
  additionalBadge,
  enableQueryURL = true
}: {
  tableId: string
  enableQueryURL?: boolean
  additionalBadge?: JSX.Element
}) => {
  const [filters, setFilters] = useFilters(tableId, enableQueryURL, false)
  const { addFieldIdToSync } = useFormControlStore()

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
          <X
            className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600 clickable"
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
