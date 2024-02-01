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
  customDependence?: Path<T>
}

function synchronizeFormFields(fieldIdToSync: Set<string>, setValue, defValues) {
  fieldIdToSync.forEach(fieldId => {
    setValue(fieldId, defValues[fieldId])
  })
}

function synchronizeCustomFormFields(customFieldIdToSync, setValue, setFilters) {
  customFieldIdToSync.forEach(fieldId => {
    setValue(fieldId as any, null as any)
    setFilters(prev => prev.filter(f => f.id !== fieldId))
  })
}

export const useFormFilter = <T extends FieldValues>({ tableId, defValues, customDependence }: IFilter<T>) => {
  const [storeFilters, setFilters] = useFilters(tableId, true, false)
  const isFirstRender = useIsFirstRender()
  const { fieldIdToSync, clearFieldToSync, customFieldIdToSync, clearCustomFieldToSync, deleteCustom } =
    useFormControlStore()
  const [filterQuery] = useQueryState('filter', { history: 'replace' })

  const columnFiltersQuery = useMemo(() => JSON.parse(filterQuery || '[]'), [filterQuery])
  const formMethods = useForm<T>({
    defaultValues: defValues
  })
  const { reset, setValue } = formMethods

  const { toggleDeleteCustom } = useFormControlStore()

  const customDep = customDependence ? formMethods.watch(customDependence) : null

  //set custom field to delete from state and form
  useEffect(() => {
    toggleDeleteCustom()
  }, [customDep, toggleDeleteCustom])

  //sync form values (for example, when we click xmark icon in badge)
  useEffect(() => {
    if (fieldIdToSync.size > 0) {
      synchronizeFormFields(fieldIdToSync, setValue, defValues)
      clearFieldToSync()
    }
  }, [fieldIdToSync, setValue, clearFieldToSync, defValues, setFilters])

  //sync form values when dynamic/custom form fields changed
  useEffect(() => {
    if (deleteCustom) {
      synchronizeCustomFormFields(customFieldIdToSync, setValue, setFilters)
      clearCustomFieldToSync()
    }
  }, [customFieldIdToSync, setValue, clearCustomFieldToSync, setFilters, deleteCustom])

  //set default values to form from store or from url on first render
  useEffect(() => {
    if (isFirstRender) {
      if (!storeFilters.length) {
        reset(
          columnFiltersQuery.reduce((acc, curr) => {
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
  }, [storeFilters, isFirstRender, reset, columnFiltersQuery])

  return formMethods
}

export const useFormFilterState = ({ tableId }: { tableId: string }) => {
  const [storeFilters, setColumnFilters] = useFilters(tableId, true, false)

  //set filter value to store on change field and remove from store if value is empty
  const setFilter = useCallback(
    (id: string) =>
      (value: any, type?: ColumnFilter['type'], name: string = id) => {
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
          if (!value?.max && !value?.min) {
            filters.splice(index, 1)
          }
          return filters
        })
      },
    [setColumnFilters]
  )

  return { storeFilters, setFilter, setColumnFilters }
}
