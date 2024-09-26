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

  const [, setQuerySearch] = useQueryState('search', { history: 'replace' })
  const { setSearch, instances } = useTableStateStore()
  const searchInstance = instances[tableId]?.search

  const {
    fieldIdToSync,
    clearFieldToSync,
    customFieldIdToSync,
    clearCustomFieldToSync,
    deleteCustom,
    addCustomFieldIdToSync
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
      startTransition(() => {
        columnFilters.forEach(filter => {
          if (filter.type) {
            addCustomFieldIdToSync(filter.id)
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
      })
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

  useEffect(() => {
    if (filterQuery) {
      startTransition(() => {
        setQuerySearch(null, { shallow: true })
        setSearch(tableId, undefined)
      })
    }
    //eslint-disable-next-line
  }, [filterQuery])

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

  //set filter value to store on change field and remove from store if value is empty
  const setFilter = useCallback(
    (id: string) =>
      (
        value: any,
        type?: ColumnFilter['type'],
        name: string = id,
        propType?: string
      ) => {
        console.log({ value, type, name, propType })
        setColumnFilters(prev => {
          const filters = [...prev]
          const index = prev.findIndex(item => item.id === id)
          if (index !== -1) {
            filters[index].value = value
          } else if (value) {
            filters.push({ id, value, type, name, propType })
          }
          if (!value) {
            filters.splice(index, 1)
          }
          if (value?.max === null && value?.min === null) {
            filters.splice(index, 1)
          }
          if (value?.max === null && value?.min === undefined) {
            filters.splice(index, 1)
          }
          if (value?.max === undefined && value?.min === null) {
            filters.splice(index, 1)
          }
          if (value?.length === 0) {
            filters.splice(index, 1)
          }
          return filters
        })
      },
    [setColumnFilters]
  )

  return { storeFilters, setFilter, setColumnFilters }
}
