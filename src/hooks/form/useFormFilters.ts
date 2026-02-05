import type { ColumnFilter } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import { startTransition, useCallback, useEffect, useMemo } from 'react'
import type { DefaultValues, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import useTableStateStore from '@/store/useTableStateStore'

interface IFilter<T> {
  tableId: string
  defValues: DefaultValues<T>

  enableQueryURL?: boolean
}

function synchronizeFormFields(
  fieldIdToSync: Set<string>,
  setValue,
  defValues
) {
  fieldIdToSync.forEach(fieldId => {
    setValue(fieldId, defValues[fieldId])
  })
}

function synchronizeCustomFormFields(
  customFieldIdToSync,
  setValue,
  setFilters
) {
  customFieldIdToSync.forEach(fieldId => {
    setValue(fieldId as any, null as any)
  })
  setFilters(prev => prev.filter(item => !customFieldIdToSync.has(item.id)))
}

export const useFormFilter = <T extends FieldValues>({
  tableId,
  defValues,
  enableQueryURL
}: IFilter<T>) => {
  const [storeFilters, setFilters] = useFilters(tableId, enableQueryURL, false)

  const { instances } = useTableStateStore()

  const searchInstance = instances[tableId]?.search

  const {
    fieldIdToSync,
    clearFieldToSync,
    customFieldIdToSync,
    clearCustomFieldToSync,
    deleteCustom
  } = useFormControlStore()

  const [filterQuery] = useQueryState('filter', { history: 'replace' })

  const columnFilters = useMemo(
    () => (filterQuery ? JSON.parse(filterQuery || '[]') : storeFilters),
    [filterQuery, storeFilters]
  )
  const formMethods = useForm<T>({
    defaultValues: defValues
  })
  const { reset, setValue } = formMethods

  //sync form values (for example, when we click xmark icon in badge)
  useEffect(() => {
    if (fieldIdToSync.size > 0) {
      startTransition(() => {
        synchronizeFormFields(fieldIdToSync, setValue, defValues)
        clearFieldToSync()
      })
    }
  }, [fieldIdToSync, setValue, clearFieldToSync, defValues, setFilters])

  //sync form values when dynamic/custom form fields changed
  useEffect(() => {
    if (deleteCustom) {
      startTransition(() => {
        synchronizeCustomFormFields(customFieldIdToSync, setValue, setFilters)
        clearCustomFieldToSync()
      })
    }
  }, [
    setValue,
    clearCustomFieldToSync,
    setFilters,
    deleteCustom,
    customFieldIdToSync
  ])

  //set default values to form from store or from url on first render
  useEffect(() => {
    if (columnFilters.length) {
      columnFilters.forEach(filter => {
        if (filter.type) {
          setValue(filter.id as any, null as any)
          setFilters(prev => prev.filter(item => item.id !== filter.id))
        }
      })
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
    //eslint-disable-next-line
  }, [])

  //clear search on filter change, clear filters on search change
  useEffect(() => {
    if (searchInstance) {
      startTransition(() => {
        reset(defValues, { keepValues: false })
        setFilters([])
      })
    }
    //eslint-disable-next-line
  }, [searchInstance])

  return formMethods
}

export const useFormFilterState = ({
  tableId,
  enableQueryUrl
}: {
  tableId: string
  enableQueryUrl?: boolean
}) => {
  const [storeFilters, setColumnFilters] = useFilters(
    tableId,
    enableQueryUrl,
    false
  )
  const [, setQueryPage] = useQueryState('page', { history: 'replace' })
  const { setPaginationState, setSearch, setSearchValue, instances } =
    useTableStateStore()

  const [, setQuerySearch] = useQueryState('search', { history: 'replace' })

  const clearPageAndSearch = useCallback(() => {
    // Read from paginationState (new format) - this is what useQueryManager reads
    const currentState = instances[tableId]?.paginationState
    const pageSize = currentState?.pageSize || 50

    // Use setPaginationState - updates BOTH paginationState AND legacy pagination
    setPaginationState(tableId, { page: 1, pageSize })
    setSearch(tableId, '')
    setSearchValue(tableId, '')
    if (enableQueryUrl) {
      setQueryPage('1', { shallow: true })
      setQuerySearch(null, { shallow: true })
    }
  }, [
    setPaginationState,
    setSearch,
    setSearchValue,
    tableId,
    enableQueryUrl,
    setQueryPage,
    setQuerySearch,
    instances
  ])

  //set filter value to store on change field and remove from store if value is empty
  const setFilter = useCallback(
    (id: string) =>
      (
        value: any,
        type?: ColumnFilter['type'],
        name: string = id,
        propType?: string
      ) => {
        clearPageAndSearch()
        //set filter value to store
        setColumnFilters(prev => {
          const filters = [...prev]
          let index = filters.findIndex(item => item.id === id)

          // Handle adding or updating filters
          if (value) {
            if (index !== -1) {
              filters[index] = {
                ...filters[index],
                value,
                type,
                name,
                propType
              }
            } else {
              filters.push({ id, value, type, name, propType })
              index = filters.length - 1 // Update index to the new item's index
            }
          }

          // Conditions for removing filters
          const shouldRemove =
            !value ||
            (value?.max === null && value?.min === null) ||
            (value?.max === null && value?.min === undefined) ||
            (value?.max === undefined && value?.min === null) ||
            value?.length === 0

          if (shouldRemove && index !== -1) {
            filters.splice(index, 1)
          }
          return filters
        })
      },
    [setColumnFilters, clearPageAndSearch]
  )

  return { storeFilters, setFilter, setColumnFilters }
}
