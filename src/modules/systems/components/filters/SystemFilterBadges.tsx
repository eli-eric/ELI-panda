import { XMarkIcon } from '@heroicons/react/24/outline'

import { Badge } from '@/components/visuals/Badge'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'

export const SystemFiltersBadges = () => {
  const [filters, setFilters] = useFilters('systems', true, false)
  return (
    <div>
      {filters.map(filter => (
        <Badge key={filter.id}>
          <span>{filter.id}</span>
          <XMarkIcon
            className="h-4 w-4 ml-1 cursor-pointer hover:text-red-600"
            onClick={() => {
              setFilters(filters.filter(f => f.id !== filter.id))
            }}
          />
        </Badge>
      ))}
    </div>
  )
}
