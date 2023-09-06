import type { Column, Table } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'

import { classNames } from '@/utils'

import { DebouncedInput } from './DebouncedInput'

export const Filter = ({ column, data }: { column: Column<any, unknown>; table: Table<any>; data?: any }) => {
  const columnFilterValue = data ? column.getFilterValue() : ''

  const facetedUniqueValues = useMemo(() => (data ? column.getFacetedUniqueValues() : []), [data, column])
  const sortedUniqueValues = useMemo(() => Array.from(facetedUniqueValues?.keys()).sort(), [facetedUniqueValues])

  const onChange = (value: string | number) => {
    if (data) {
      column.setFilterValue(value)
    }
  }

  return (
    <Fragment>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue as string}
        onChange={onChange}
        placeholder={`Search... (${data ? column.getFacetedUniqueValues().size : 0})`}
        className={classNames(
          'w-full placeholder:text-xs placeholder:font-normal rounded-md border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-xs'
        )}
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </Fragment>
  )
}
