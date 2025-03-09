import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useCallback } from 'react'

import { cx } from '@/utils'

import type { PageSizeDropdownProps } from './types'

/**
 * A dropdown component for selecting page size.
 * Rebuilt with Headless UI Listbox for better performance and accessibility.
 */
export function PageSizeDropdown({
  value,
  onChange,
  pageSizeOptions
}: PageSizeDropdownProps) {
  // Použijeme useCallback, abychom předešli zbytečným re-renderům
  // a vytvořili wrapper nad standardním onChange, který bude pracovat s React syntetickými událostmi
  const handleChange = useCallback(
    (newValue: number) => {
      onChange(newValue)
    },
    [onChange]
  )

  return (
    <Listbox value={value} onChange={handleChange}>
      <div className="relative w-20">
        <ListboxButton
          className={cx(
            'relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-1.5 pl-3 pr-8 text-left',
            'text-sm text-gray-700 dark:text-gray-300',
            'border border-gray-300 dark:border-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900'
          )}
        >
          <span className="block truncate">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom start"
            className={cx(
              'absolute z-50 mt-1 max-h-56 w-20 overflow-auto rounded-md',
              'bg-white dark:bg-gray-800 py-1 text-sm shadow-lg',
              'ring-1 ring-black ring-opacity-5 focus:outline-none'
            )}
          >
            {pageSizeOptions.map(size => (
              <ListboxOption
                key={size}
                value={size}
                className={({ active }) =>
                  cx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                      : 'text-gray-900 dark:text-gray-200'
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cx(
                        'block truncate',
                        selected ? 'font-medium' : 'font-normal'
                      )}
                    >
                      {size}
                    </span>

                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-500">
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  )
}
