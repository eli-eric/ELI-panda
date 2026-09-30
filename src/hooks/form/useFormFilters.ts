import type { ColumnFilter } from '@tanstack/react-table'
import { startTransition, useCallback, useEffect, useMemo, useRef } from 'react'
import type { DefaultValues, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import useTableStateStore from '@/store/useTableStateStore'
import { getTablePageSizeDefault } from '@/types/pagination'
import { parseColumnFilterParam } from '@/utils/urlQuery'

interface IFilter<T> {
    tableId: string
    defValues: DefaultValues<T>

    enableQueryURL?: boolean
}

function synchronizeFormFields(fieldIdToSync: Set<string>, setValue, defValues) {
    fieldIdToSync.forEach(fieldId => {
        setValue(fieldId, defValues[fieldId])
    })
}

function synchronizeCustomFormFields(customFieldIdToSync, setValue, setFilters) {
    customFieldIdToSync.forEach(fieldId => {
        setValue(fieldId as any, null as any)
    })
    setFilters(prev => prev.filter(item => !customFieldIdToSync.has(item.id)))
}

export const useFormFilter = <T extends FieldValues>({
    tableId,
    defValues,
    enableQueryURL,
}: IFilter<T>) => {
    const [storeFilters, setFilters] = useFilters(tableId, enableQueryURL, false)

    const { instances } = useTableStateStore()

    const searchInstance = instances[tableId]?.search

    const {
        fieldIdToSync,
        clearFieldToSync,
        customFieldIdToSync,
        clearCustomFieldToSync,
        deleteCustom,
    } = useFormControlStore()

    const [filterQuery] = useUrlQueryState('filter', { history: 'replace' })

    const columnFilters = useMemo(
        () => (filterQuery ? parseColumnFilterParam(filterQuery) : storeFilters),
        [filterQuery, storeFilters],
    )
    const formMethods = useForm<T>({
        defaultValues: defValues,
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
    }, [setValue, clearCustomFieldToSync, setFilters, deleteCustom, customFieldIdToSync])

    // Seed the form from the store or the URL. This used to run on mount only,
    // which is a render too early on a server-rendered page: the URL filter of a
    // deep link arrives just after hydration, so the table showed the filter
    // while the sheet's fields stayed blank. It now waits for the filters to
    // turn up — but only while the form is untouched, so a late arrival can
    // never reset fields the user is in the middle of filling in.
    const hasSeededForm = useRef(false)

    useEffect(() => {
        if (hasSeededForm.current || !columnFilters.length) return

        hasSeededForm.current = true
        if (formMethods.formState.isDirty) return

        columnFilters.forEach(filter => {
            if (filter.type) {
                setValue(filter.id as any, null as any)
                setFilters(prev => prev.filter(item => item.id !== filter.id))
            }
        })
        reset(
            columnFilters.reduce<Record<string, unknown>>((acc, curr) => {
                if (curr.id === 'systemLevel') {
                    acc[curr.id] = { uid: curr.value, name: curr.value }
                }
                acc[curr.id] = curr.value

                return acc
            }, {}) as DefaultValues<T>,
        )
        //eslint-disable-next-line
    }, [columnFilters])

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
    enableQueryUrl,
}: {
    tableId: string
    enableQueryUrl?: boolean
}) => {
    const [storeFilters, setColumnFilters] = useFilters(tableId, enableQueryUrl, false)
    const [, setQueryPage] = useUrlQueryState('page', { history: 'replace' })
    const { setPaginationState, setSearch, setSearchValue, instances } = useTableStateStore()

    const [, setQuerySearch] = useUrlQueryState('search', { history: 'replace' })

    const clearPageAndSearch = useCallback(() => {
        // Read from paginationState (new format) - this is what useQueryManager reads
        const currentState = instances[tableId]?.paginationState
        const pageSize = currentState?.pageSize || getTablePageSizeDefault(tableId)

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
        instances,
    ])

    //set filter value to store on change field and remove from store if value is empty
    const setFilter = useCallback(
        (id: string) =>
            (value: any, type?: ColumnFilter['type'], name: string = id, propType?: string) => {
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
                                propType,
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
        [setColumnFilters, clearPageAndSearch],
    )

    return { storeFilters, setFilter, setColumnFilters }
}
