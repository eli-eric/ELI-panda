import { XMarkIcon } from '@heroicons/react/24/outline'

import { Badge } from '@/components/visuals/Badge'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

export const SystemFiltersBadges = () => {
  const [filters, setFilters] = useFilters('systems', true, false)
  const { setInstance } = useFormControlStore()

  return (
    <div>
      {filters.length > 0 && <span className="text-sm pr-2 font-medium text-gray-600">Filters:</span>}
      {filters.map(filter => (
        <Badge key={filter.id}>
          <span>{filter.id}</span>
          <XMarkIcon
            className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
            onClick={() => {
              setFilters(filters.filter(f => f.id !== filter.id))
              setInstance('systemsFilter', filter.id)
            }}
          />
        </Badge>
      ))}
    </div>
  )
}
