import { useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import type { PageSizeDropdownProps } from './types'

/**
 * A dropdown component for selecting page size.
 * Built with shadcn/ui Select for better performance and accessibility.
 */
export function PageSizeDropdown({
  value,
  onChange,
  pageSizeOptions
}: PageSizeDropdownProps) {
  const handleChange = useCallback(
    (newValue: string) => {
      onChange(parseInt(newValue, 10))
    },
    [onChange]
  )

  return (
    <Select value={value.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-20">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {pageSizeOptions.map(size => (
          <SelectItem key={size} value={size.toString()}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
