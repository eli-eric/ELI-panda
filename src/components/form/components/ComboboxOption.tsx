import { Combobox as HUICombobox } from '@headlessui/react'

import type { CodebookType } from '@/types/responses/codebook'
import { cx } from '@/utils'

import { SelectOption } from './SelectOption'

interface Props {
  item: CodebookType
  selected: boolean
}

export const ComboboxOption = ({ item, selected }: Props) => (
  <HUICombobox.Option
    as="div"
    value={item}
    defaultValue={''}
    className={({ active }) =>
      cx(
        'relative cursor-default select-none py-2 pl-3 pr-9',
        active
          ? 'bg-primary-500 text-white'
          : 'text-gray-900 dark:text-gray-200'
      )
    }
  >
    {({ active }) => (
      <SelectOption item={item} selected={selected} active={active} />
    )}
  </HUICombobox.Option>
)
