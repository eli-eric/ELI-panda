import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Table } from '@tanstack/react-table'
import type { FC } from 'react'

interface Props {
  table: Table<any>
}

export const TableSettings: FC<Props> = ({ table }) => (
  <Disclosure>
    {({ open }) => (
      <div id="column-hiding">
        <Disclosure.Button className=" text-sm flex items-center justify-between w-full py-[2px] px-4  shadow-sm  text-gray-500 bg-white hover:bg-gray-50 ">
          <span>{open ? 'Hide table options' : 'Show table options'}</span>
          {open ? (
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </Disclosure.Button>

        <Disclosure.Panel className="bg-white  border-t border-gray-200 overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="py-1 px-4">
                <div className="flex items-center">
                  <input
                    {...{
                      type: 'checkbox',
                      id: 'toggle-all',
                      checked: table.getIsAllColumnsVisible(),
                      onChange: table.getToggleAllColumnsVisibilityHandler(),
                      className: 'focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded'
                    }}
                  />
                  <label htmlFor="toggle-all" className="ml-2 text-sm text-gray-700">
                    Toggle All
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-1 flex flex-wrap">
                {table.getAllLeafColumns().map(column => (
                  <div key={column.id} className="flex items-center space-x-2 mr-4">
                    <input
                      {...{
                        type: 'checkbox',
                        id: `checkbox-${column.id}`,
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                        className: 'focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded'
                      }}
                    />
                    <label htmlFor={`checkbox-${column.id}`} className=" text-sm text-gray-700">
                      {column.id}
                    </label>
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
)
