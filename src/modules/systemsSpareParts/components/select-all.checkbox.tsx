import type { Table } from '@tanstack/react-table'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import type { SystemDetail } from '@/types/responses/systems'

interface IndeterminateCheckboxProps {
  table: Table<SystemDetail>
  setSelectedUids: (uids: string[]) => void
}

export function SelectAllCheckbox({
  table,
  setSelectedUids
}: IndeterminateCheckboxProps) {
  const [checked, setChecked] = useState(false)

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

    const topLevelSystemsUids = topLevelRowIds.map(
      id => table.getRow(id).original.uid
    )
    setSelectedUids(topLevelSystemsUids)
  }

  const onChange = (checked: boolean) => {
    setChecked(checked)
    if (checked) {
      handleToggleSelectAllTopLevel()
    } else {
      setSelectedUids([])
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
