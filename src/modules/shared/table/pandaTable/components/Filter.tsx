import type { Column, Table } from '@tanstack/react-table'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CODEBOOK } from '@/types/constants/codebook'

import { DefferedCombobox } from './defferedComponents/DefferedCombobox'
import { DefferedInput } from './defferedComponents/DefferedInput'
import { DefferedListbox } from './defferedComponents/DefferedListbox'

export const Filter = ({
  column,
  data,
  manualFiltering
}: {
  column: Column<any, unknown>
  table: Table<any>
  data?: any
  manualFiltering: boolean
}) => {
  const filterType = column.columnDef.meta?.filter?.type
  const codebook = column.columnDef.meta?.filter?.codebookCode as CODEBOOK

  const onChange = (value: string | number) => {
    if (data) {
      column.setFilterValue(value)
    }
  }

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
            const handleChangeFrom = (value: string | number) => {
              column.setFilterValue((old: [number, number]) => {
                if ((!value || value === '') && !old?.[1]) {
                  return undefined
                }

                return [value, old?.[1]]
              })
            }
            const handleChangeTo = (value: string | number) => {
              column.setFilterValue((old: [number, number]) => {
                if ((!value || value === '') && !old?.[0]) {
                  return undefined
                }
                return [old?.[0], value]
              })
            }
            return (
              <div className="flex space-x-2">
                <DefferedInput
                  type="number"
                  value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
                  onChange={handleChangeFrom}
                  placeholder={'from'}
                />
                <DefferedInput
                  type="number"
                  value={(column.getFilterValue() as [number, number])?.[1] ?? ''}
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
          placeholder={`Search... (${data ? column.getFacetedUniqueValues().size : 0})`}
          list={column.id + 'list'}
        />
      )
    }
  }

  return null
}
