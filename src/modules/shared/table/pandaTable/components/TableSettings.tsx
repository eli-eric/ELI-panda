import type { FC } from 'react'

import { Disclosure } from '@/components/ui'
import { cx } from '@/utils'

interface Props {
  getIsAllColumnsVisible: () => boolean
  getToggleAllColumnsVisibilityHandler: () => (e: unknown) => void
  getAllLeafColumns: () => any[]
}

export const TableSettings: FC<Props> = ({
  getAllLeafColumns,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler
}) => (
  <div id="column-hiding">
    <Disclosure title="Show table options">
      <ul className="divide-y divide-gray-200">
        <li>
          <div className="py-1 px-4">
            <div className="flex items-center">
              <input
                {...{
                  type: 'checkbox',
                  id: 'toggle-all',
                  checked: getIsAllColumnsVisible(),
                  onChange: getToggleAllColumnsVisibilityHandler(),
                  className: cx(
                    'focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:text-primary-600 rounded',
                    !getIsAllColumnsVisible() && 'dark:bg-gray-700'
                  )
                }}
              />
              <label
                htmlFor="toggle-all"
                className="hover:text-primary-600 ml-2 text-sm text-gray-700 dark:text-gray-200"
              >
                Toggle All
              </label>
            </div>
          </div>
        </li>
        <li>
          <div className="px-4 py-1 flex flex-wrap">
            {getAllLeafColumns().map(column => {
              return (
                <div
                  key={column.id}
                  className="flex items-center space-x-2 mr-4"
                >
                  <input
                    type={'checkbox'}
                    id={`checkbox-${column.id}`}
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className={cx(
                      'focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:text-primary-600 rounded',
                      !column.getIsVisible() && 'dark:bg-gray-700'
                    )}
                  />
                  <label
                    htmlFor={`checkbox-${column.id}`}
                    className="hover:text-primary-600 text-sm text-gray-700 dark:text-gray-200"
                  >
                    {typeof column.columnDef?.header === 'string'
                      ? column.columnDef?.header || column.id
                      : column.id}
                  </label>
                </div>
              )
            })}
          </div>
        </li>
      </ul>
    </Disclosure>
  </div>
)
