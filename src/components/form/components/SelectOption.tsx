import { CheckIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '@/components/Tooltip'
import type { CodebookType } from '@/types/responses/codebook'
import { classNames } from '@/utils'

type Props = {
  item: CodebookType
  selected: boolean
  active: boolean
}

export const SelectOption = ({ item, selected, active }: Props) => (
  <>
    <Tooltip content={item.name}>
      <span
        className={classNames('block truncate', selected && 'font-semibold')}
      >
        {item?.name}
      </span>
    </Tooltip>
    {selected && (
      <Tooltip content={item.name}>
        <span
          className={classNames(
            'absolute inset-y-0 right-0 flex items-center pr-4',
            active ? 'text-white' : 'text-primary-500'
          )}
        >
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
        </span>
      </Tooltip>
    )}
  </>
)
