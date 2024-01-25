import type { ColumnFilter } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useEffect, useMemo } from 'react'
import type { DefaultValues, FieldValues, Path } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useIsFirstRender } from 'usehooks-ts'

import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

interface IFilter<T> {
  tableId: string
  defValues: DefaultValues<T>
}

export const useFormFilter = <T extends FieldValues>({ tableId, defValues }: IFilter<T>) => {
  const [storeFilters] = useFilters(tableId, true, false)

  const [filterQuery] = useQueryState('filter', { history: 'replace' })
  const columnFilters = useMemo(() => JSON.parse(filterQuery || '[]'), [filterQuery])
  const formMethods = useForm<T>({
    defaultValues: defValues
  })
  const { reset, setValue } = formMethods
  const isFirstRender = useIsFirstRender()
  const { fieldIdToSync, clear } = useFormControlStore()

  //sync form values (for example, when we click xmark icon in badge)
  useEffect(() => {
    if (fieldIdToSync.length > 0) {
      fieldIdToSync.forEach(fieldId => {
        setValue(fieldId as Path<T>, defValues[fieldId as Path<T>])
      })
      clear()
    }
  }, [fieldIdToSync, setValue, clear, defValues])

  //set default values from store or from url on first render
  useEffect(() => {
    if (isFirstRender) {
      if (!storeFilters.length) {
        reset(
          columnFilters.reduce((acc, curr) => {
            if (curr.id === 'systemLevel') {
              acc[curr.id] = { uid: curr.value, name: curr.value }
            }
            acc[curr.id] = curr.value
            return acc
          }, {})
        )
      }
      if (storeFilters.length) {
        reset(
          storeFilters.reduce((acc, curr) => {
            acc[curr.id] = curr.value
            return acc
          }, {} as any)
        )
      }
    }
  }, [storeFilters, isFirstRender, reset, columnFilters])

  return formMethods
}

export const useFormFilterState = ({ tableId }: { tableId: string }) => {
  const [storeFilters, setColumnFilters] = useFilters(tableId, true, false)

  //set filter value to store on change field and remove from store if value is empty
  const setFilter = useCallback(
    (id: string) =>
      (value: unknown, type?: ColumnFilter['type'], name: string = id) => {
        setColumnFilters(prev => {
          const filters = [...prev]
          const index = prev.findIndex(item => item.id === id)
          if (index !== -1) {
            filters[index].value = value
          } else if (value) {
            filters.push({ id, value, type, name })
          }
          if (!value) {
            filters.splice(index, 1)
          }
          return filters
        })
      },
    [setColumnFilters]
  )

  return { storeFilters, setFilter, setColumnFilters }
}
