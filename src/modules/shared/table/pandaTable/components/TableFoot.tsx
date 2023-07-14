import type { HeaderGroup } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

import { classNames } from '@/helpers'

interface Props<T extends object> {
  getFooterGroups: () => HeaderGroup<T>[]
}

export const TableFoot = <T extends object>({ getFooterGroups }: Props<T>) => (
  <tfoot>
    {getFooterGroups().map(footerGroup => (
      <tr key={footerGroup.id} className={classNames('bg-gray-50')}>
        {footerGroup.headers.map(header => (
          <td key={header.id} className={classNames('text-sm sm:pl-6 sm:pr-6 text-gray-500')}>
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tfoot>
)
