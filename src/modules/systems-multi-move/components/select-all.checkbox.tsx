import type { Table } from '@tanstack/react-table'
import type { HTMLProps } from 'react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystemsMoveStore } from '../store/useSystemsMoveStore'

interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
  table: Table<SystemDetail>
}

export function SelectAllCheckbox({
  table,
  ...rest
}: IndeterminateCheckboxProps) {
  const [checked, setChecked] = useState(false)

  const { resetMovingSystems, setMovingSystems } = useSystemsMoveStore()

  const handleToggleSelectAllTopLevel = () => {
    const topLevelRowIds = table
      .getRowModel()
      .rows.map(row => (row.id.includes('.') ? row.id.split('.')[0] : row.id))
      .filter((value, index, self) => self.indexOf(value) === index)

    table.setRowSelection(() => {
      const newSelection = {}
      // Select all top-level rows
      topLevelRowIds.forEach(id => {
        newSelection[id] = true
      })
      return newSelection
    })

    const topLevelSystems = topLevelRowIds.map(id => table.getRow(id).original)
    setMovingSystems(topLevelSystems)
  }

  const onChange = e => {
    if (e.target.checked) {
      setChecked(e.target.checked)
      handleToggleSelectAllTopLevel()
    } else {
      setChecked(e.target.checked)
      resetMovingSystems()
      table.setRowSelection({})
    }
  }

  return (
    <input
      type="checkbox"
      className={cn(
        'cursor-pointer',
        'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
        !checked && 'dark:bg-gray-700'
      )}
      onChange={onChange}
      checked={checked}
      {...rest}
    />
  )
}
