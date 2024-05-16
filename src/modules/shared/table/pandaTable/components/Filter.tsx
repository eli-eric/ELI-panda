import type { Column, Table } from '@tanstack/react-table'
import { useCallback } from 'react'

import type { CodebookType } from '@/types/responses/codebook'

import type { CODEBOOK } from '@/types/constants/codebook'

import { DefferedCombobox } from './defferedComponents/DefferedCombobox'
import { DefferedInput } from './defferedComponents/DefferedInput'
import { DefferedListbox } from './defferedComponents/DefferedListbox'

export const Filter = ({
  column,
  manualFiltering
}: {
  column: Column<any, unknown>
  table: Table<any>
  manualFiltering: boolean
}) => {
  const filterType = column.columnDef.meta?.filter?.type
  const codebook = column.columnDef.meta?.filter?.codebookCode as CODEBOOK

  const { setFilterValue } = column

  const onChange = useCallback(
    (value: string | number) => {
      setFilterValue(value)
    },
    [setFilterValue]
  )

  const handleChangeFrom = useCallback(
    (value: string | number) => {
      setFilterValue((old: [number, number]) => {
        if ((!value || value === '') && !old?.[1]) {
          return undefined
        }

        return [value, old?.[1]]
      })
    },
    [setFilterValue]
  )

  const handleChangeTo = useCallback(
    (value: string | number) => {
      setFilterValue((old: [number, number]) => {
        if ((!value || value === '') && !old?.[0]) {
          return undefined
        }
        return [old?.[0], value]
      })
    },
    [setFilterValue]
  )

  switch (manualFiltering) {
    case true:
      {
        switch (filterType) {
          case 'listOfValues': {
            return (
              <DefferedListbox
                value={column.getFilterValue() as CodebookType}
                codebook={codebook}
                onChange={onChange}
              />
            )
          }
          case 'number': {
            return (
              <div className="flex space-x-2">
                <DefferedInput
                  type="number"
                  value={
                    (column.getFilterValue() as [number, number])?.[0] ?? ''
                  }
                  onChange={handleChangeFrom}
                  placeholder={'from'}
                />
                <DefferedInput
                  type="number"
                  value={
                    (column.getFilterValue() as [number, number])?.[1] ?? ''
                  }
                  onChange={handleChangeTo}
                  placeholder={'to'}
                />
              </div>
            )
          }
          case 'autoComplete': {
            return (
              <DefferedCombobox
                value={column.getFilterValue() as CodebookType}
                codebook={codebook}
                onChange={onChange}
              />
            )
          }
          case 'string': {
            return (
              <DefferedInput
                type="text"
                value={column.getFilterValue() as string}
                onChange={onChange}
                list={column.id + 'list'}
              />
            )
          }
        }
      }
      break
    case false: {
      return (
        <DefferedInput
          type="text"
          value={column.getFilterValue() as string}
          onChange={onChange}
          placeholder={`Search... (${column?.getFacetedUniqueValues()?.size})`}
          list={column.id + 'list'}
        />
      )
    }
  }

  return null
}
