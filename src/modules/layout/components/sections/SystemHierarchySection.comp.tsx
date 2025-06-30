import { type FC, Fragment } from 'react'

import { Disclosure } from '@/components/ui'

interface SystemHierarchySectionProps {
  systemDetail: {
    name?: string | null
    parentPath?: Array<{
      uid?: string | null
      name?: string | null
    } | null> | null
  }
}

export const SystemHierarchySection: FC<SystemHierarchySectionProps> = ({
  systemDetail
}) => {
  if (!systemDetail?.parentPath || systemDetail.parentPath.length === 0) {
    return null
  }

  return (
    <Disclosure
      title="System Hierarchy"
      defaultOpen={false}
      className="w-full border rounded-md"
      buttonClassName="p-3 bg-gray-50 dark:bg-gray-700"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="text-xs">
        <p className="text-gray-600 dark:text-gray-400 mb-2">Path:</p>
        <div className="flex flex-wrap items-center gap-1">
          {systemDetail.parentPath.map((parent, index) => (
            <Fragment key={parent?.uid || index}>
              <span className="text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-xs">
                {parent?.name || 'Unknown'}
              </span>
              {index < systemDetail.parentPath!.length - 1 && (
                <span className="text-gray-400 mx-1">→</span>
              )}
            </Fragment>
          ))}
          <span className="text-gray-400 mx-1">→</span>
          <span className="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-xs font-medium">
            {systemDetail.name}
          </span>
        </div>
      </div>
    </Disclosure>
  )
}
