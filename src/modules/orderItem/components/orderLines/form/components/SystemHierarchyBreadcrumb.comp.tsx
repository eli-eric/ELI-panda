import { type FC, Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { CodebookType } from '@/types/responses/codebook'

interface SystemHierarchyBreadcrumbProps {
  parentPath?: CodebookType[] | null
  currentSystem?: CodebookType | null
  className?: string
}

/**
 * SystemHierarchyBreadcrumb Component
 *
 * Displays a read-only breadcrumb trail showing the full system hierarchy
 * from root to the currently selected system.
 *
 * Features:
 * - Color coding by systemLevel (KEY_SYSTEMS=orange, TECHNOLOGY_UNIT=lime)
 * - Compact inline display with arrow separators
 * - Placeholder message when no system is selected
 * - Read-only (non-interactive)
 */
export const SystemHierarchyBreadcrumb: FC<SystemHierarchyBreadcrumbProps> = ({
  parentPath,
  currentSystem,
  className
}) => {
  const { formatMessage: fm } = useIntl()

  // Show placeholder when no system is selected
  if (!currentSystem) {
    return (
      <div className={cn('text-sm text-muted-foreground', className)}>
        No parent system selected
      </div>
    )
  }

  // Combine parentPath and current system into full hierarchy
  const fullPath = [...(parentPath || []), currentSystem]

  return (
    <div
      className={cn('flex flex-wrap items-center gap-1 text-xs', className)}
    >
      <span className="text-muted-foreground font-medium mr-1">
        System Hierarchy:
      </span>
      {fullPath.map((system, index) => (
        <Fragment key={system?.uid || index}>
          <span
            className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200',
              system.systemLevel === 'KEY_SYSTEMS' &&
                'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
              system.systemLevel === 'TECHNOLOGY_UNIT' &&
                'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300'
            )}
          >
            {system?.name || 'Unknown'}
          </span>
          {index < fullPath.length - 1 && (
            <span className="text-gray-400 mx-1">
              {fm({ id: message.common.system.arrow })}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
