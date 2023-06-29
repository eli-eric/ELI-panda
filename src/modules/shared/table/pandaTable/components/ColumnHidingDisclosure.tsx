import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Table } from '@tanstack/react-table'

export const ColumnHidingDisclosure = ({ table }: { table: Table<any> }) => (
  <Disclosure>
    {({ open }) => (
      <div id="column-hiding">
        <Disclosure.Button className="border w-full justify-between p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
          {open ? (
            <XMarkIcon className="block h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="block h-4 min-w-full" aria-hidden="true" />
          )}
        </Disclosure.Button>

        <Disclosure.Panel>
          <div className="inline-block border border-black shadow rounded">
            <div className="px-1 border-b border-black">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: table.getIsAllColumnsVisible(),
                    onChange: table.getToggleAllColumnsVisibilityHandler()
                  }}
                />{' '}
                Toggle All
              </label>
            </div>
            <div className="">
              {table.getAllLeafColumns().map(column => (
                <div key={column.id} className=" px-1">
                  <label className="flex items-center">
                    <input
                      {...{
                        type: 'checkbox',
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                        className: 'mr-1'
                      }}
                    />{' '}
                    {column.id}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
)
