import type { Table } from '@tanstack/react-table'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystemsMoveStore } from '../store/useSystemsMoveStore'

interface IndeterminateCheckboxProps {
  table: Table<SystemDetail>
}

export function SelectAllCheckbox({ table }: IndeterminateCheckboxProps) {
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

  const onChange = (checked: boolean) => {
    setChecked(checked)
    if (checked) {
      handleToggleSelectAllTopLevel()
    } else {
      resetMovingSystems()
      table.setRowSelection({})
    }
  }

  return (
    <Checkbox
      className="cursor-pointer"
      onCheckedChange={onChange}
      checked={checked}
    />
  )
}
