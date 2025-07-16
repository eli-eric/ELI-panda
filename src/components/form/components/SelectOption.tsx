import { CheckIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '@/components/Tooltip'
import { cn } from '@/lib/utils'
import type { CodebookType } from '@/types/responses/codebook'

type Props = {
  item: CodebookType
  selected: boolean
  active: boolean
}

export const SelectOption = ({ item, selected, active }: Props) => (
  <>
    <Tooltip content={item.name}>
      <span className={cn('block truncate', selected && 'font-semibold')}>
        {item?.name}
      </span>
    </Tooltip>
    {selected && (
      <Tooltip content={item.name}>
        <span
          className={cn(
            'absolute inset-y-0 right-0 flex items-center pr-4',
            active ? 'text-white' : 'text-orange-500'
          )}
        >
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
        </span>
      </Tooltip>
    )}
  </>
)
