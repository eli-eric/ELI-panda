import type { Column, Table } from '@tanstack/react-table'

import { classNames } from '@/helpers'
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
            return (
              <div className="flex space-x-2">
                <DefferedInput
                  type="number"
                  value={(column.getFilterValue() as [number, number])?.[0] ?? ''}
                  onChange={value =>
                    data && column.setFilterValue((old: [number, number]) => (value ? [value, old?.[1]] : old))
                  }
                  placeholder={'from'}
                  className={classNames(
                    'w-full placeholder:text-xs placeholder:font-normal rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-xs'
                  )}
                />
                <DefferedInput
                  type="number"
                  value={(column.getFilterValue() as [number, number])?.[1] ?? ''}
                  onChange={value =>
                    data && column.setFilterValue((old: [number, number]) => (value ? [old?.[0], value] : old))
                  }
                  placeholder={'to'}
                  className={classNames(
                    'w-full placeholder:text-xs placeholder:font-normal rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-xs'
                  )}
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
                className={classNames(
                  'w-full placeholder:text-xs placeholder:font-normal rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-xs'
                )}
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
          className={classNames(
            'w-full placeholder:text-xs placeholder:font-normal rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-xs'
          )}
          list={column.id + 'list'}
        />
      )
    }
  }

  return null
}
