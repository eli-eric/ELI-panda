import { ChevronDown, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getBadgeVariantBySystemLevel } from '@/modules/systemItem/utils'
import type { SystemLevel } from '@/types/gql/graphql'

interface SystemBadgeProps {
  value: string
  systemLevel?: SystemLevel
  hasPhysicalItem?: boolean
  variant: 'expandable' | 'clickable'
  isExpanded?: boolean
  onClick?: () => void
  className?: string
}

export const SystemBadge = ({
  value,
  systemLevel,
  hasPhysicalItem = false,
  variant,
  isExpanded = false,
  onClick,
  className
}: SystemBadgeProps) => {
  return (
    <Badge
      onClick={onClick}
      variant="outline"
      className={cn(
        'flex items-center h-7 max-w-full overflow-hidden justify-start',
        variant === 'expandable'
          ? 'gap-1 px-2 cursor-pointer hover:opacity-80'
          : 'px-3 hover:opacity-80',
        getBadgeVariantBySystemLevel(systemLevel),
        !hasPhysicalItem && 'bg-transparent dark:bg-transparent',
        className
      )}
    >
      {variant === 'expandable' &&
        (isExpanded ? (
          <ChevronDown className="size-5 shrink-0" />
        ) : (
          <ChevronRight className="size-5 shrink-0" />
        ))}
      <span
        className={cn(
          'truncate min-w-0',
          variant === 'clickable' && 'cursor-pointer hover:underline'
        )}
      >
        {value}
      </span>
    </Badge>
  )
}
