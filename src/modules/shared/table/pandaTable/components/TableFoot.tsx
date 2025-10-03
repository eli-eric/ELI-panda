import type { HeaderGroup } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  getFooterGroups: () => HeaderGroup<any>[]
}

export const TableFoot: FC<Props> = ({ getFooterGroups }) => (
  <tfoot>
    {getFooterGroups().map(footerGroup => (
      <tr
        key={footerGroup.id}
        className={cn('bg-gray-50 dark:bg-gray-700 dark:text-gray-200')}
      >
        {footerGroup.headers.map(header => (
          <td
            key={header.id}
            className={cn(
              'text-xs sm:pl-6 sm:pr-6 text-gray-500',
              header.column.columnDef.meta?.className
            )}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.footer, header.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tfoot>
)
