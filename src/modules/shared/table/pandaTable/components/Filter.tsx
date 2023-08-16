import type { Column, Table } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'

import { classNames } from '@/helpers'

import { DebouncedInput } from './DebouncedInput'

export const Filter = ({ column, data }: { column: Column<any, unknown>; table: Table<any>; data?: any }) => {
  const columnFilterValue = data ? column.getFilterValue() : ''

  const facetedUniqueValues = useMemo(() => (data ? column.getFacetedUniqueValues() : []), [data, column])

  const sortedUniqueValues = useMemo(() => Array.from(facetedUniqueValues?.keys()).sort(), [facetedUniqueValues])

  return (
    <Fragment>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => (data ? column.setFilterValue(value) : {})}
        placeholder={`Search... (${data ? column.getFacetedUniqueValues().size : 0})`}
        className={classNames(
          'block w-full appearance-none border px-3 py-2 placeholder-gray-400 rounded-md focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
          'border-gray-300'
        )}
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </Fragment>
  )
}
