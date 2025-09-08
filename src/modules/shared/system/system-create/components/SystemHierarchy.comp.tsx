import { type FC, Fragment } from 'react'
import { Disclosure } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { SystemLevel } from '@/types/gql/graphql'

interface SystemHierarchyProps {
  parentPath: Array<{
    uid?: string | null
    name?: string | null
    systemLevel?: SystemLevel | null
  }>
  currentSystemName?: string | null
  currentSystemLevel?: SystemLevel | null
  className?: string
}

export const SystemHierarchy: FC<SystemHierarchyProps> = ({
  parentPath,
  currentSystemName,
  currentSystemLevel,
  className
}) => {
  if (!parentPath || parentPath.length === 0) {
    return null
  }

  return (
    <Disclosure
      title="System Hierarchy"
      defaultOpen={true}
      className={cn(
        'w-full border rounded-md overflow-hidden shadow-md',
        className
      )}
      buttonClassName="bg-gray-50 dark:bg-gray-700"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="text-xs">
        <div className="flex flex-wrap items-center gap-1">
          {parentPath.map((parent, index) => (
            <Fragment key={parent?.uid || index}>
              <span
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200',
                  parent.systemLevel === 'KEY_SYSTEMS' &&
                    'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
                  parent.systemLevel === 'TECHNOLOGY_UNIT' &&
                    'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300'
                )}
              >
                {parent?.name || 'Unknown'}
              </span>
              {index < parentPath.length - 1 && (
                <span className="text-gray-400 mx-1">→</span>
              )}
            </Fragment>
          ))}
          <span className="text-gray-400 mx-1">→</span>
          <span
            className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              currentSystemLevel === 'KEY_SYSTEMS' &&
                'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
              currentSystemLevel === 'TECHNOLOGY_UNIT' &&
                'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300'
            )}
          >
            {currentSystemName}
          </span>
        </div>
      </div>
    </Disclosure>
  )
}
