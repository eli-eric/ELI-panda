import { Combobox as HUICombobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { classNames } from '@/utils'

interface Props {
  item: CodebookType
  selected: boolean
}

export const ComboboxOption = ({ item, selected }: Props) => (
  <HUICombobox.Option
    key={item.uid}
    value={item}
    defaultValue={''}
    className={({ active }) =>
      classNames(
        'relative cursor-default select-none py-2 pl-3 pr-9',
        active ? 'bg-primary-500 text-white' : 'text-gray-900'
      )
    }
  >
    {({ active }) => (
      <>
        <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>
        {selected && (
          <span
            className={classNames(
              'absolute inset-y-0 right-0 flex items-center pr-4',
              active ? 'text-white' : 'text-primary-500'
            )}
          >
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </HUICombobox.Option>
)
