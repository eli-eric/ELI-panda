import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useFilterCreate } from '@/hooks/filter/useFilterCreate'
import { useFilterDelete } from '@/hooks/filter/useFilterDelete'
import { useFilterDetails } from '@/hooks/filter/useFilterDetails'
import { useFilterUpdate } from '@/hooks/filter/useFilterUpdate'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'

import type { FilterOperationsConfig, FilterValue, SavedFilter } from '../types'

// Helper: Parse filter values from JSON string
const parseFilterValues = (value: string): FilterValue[] => {
    try {
        return JSON.parse(value) as FilterValue[]
    } catch {
        return []
    }
}

// Helper: Sync custom fields that need to be tracked
const syncCustomFields = (
    filterValues: FilterValue[],
    addCustomFieldIdToSync: (id: string) => void,
) => {
    filterValues.forEach(filter => {
        if (filter.type) {
            addCustomFieldIdToSync(filter.id)
        }
    })
}

// Helper: Compute form values from filter values and defaults
const computeFormValues = (
    filterValues: FilterValue[],
    defaultFormValues: Record<string, unknown>,
): Record<string, unknown> => {
    const result = Object.keys(defaultFormValues).reduce<Record<string, unknown>>((acc, key) => {
        const filterItem = filterValues.find(item => item.id === key)
        acc[key] = filterItem ? filterItem.value : defaultFormValues[key]
        return acc
    }, {})

    // Add custom field values
    filterValues.forEach(filter => {
        if (filter.type) {
            result[filter.id] = filter.value
        }
    })

    return result
}

export const useFilterOperations = ({
    tableId,
    enableQueryURL,
    resetForm,
    defaultFormValues,
}: FilterOperationsConfig) => {
    const formMethods = useForm()
    const savedFilter = formMethods.watch('savedFilter') as SavedFilter | null

    const { storeFilters, setColumnFilters } = useFormFilterState({
        tableId,
        enableQueryUrl: enableQueryURL,
    })

    const { addCustomFieldIdToSync } = useFormControlStore()
    const { filters, refetch } = useFilterDetails(tableId)
    const { createUserSettings } = useFilterCreate({ tableId })
    const { updateSavedFilter } = useFilterUpdate()
    const { deleteSavedFilter } = useFilterDelete()
    const user = useSession().data?.user

    // Apply a saved filter to the form
    const applyFilter = useCallback(
        (filter: SavedFilter | null) => {
            if (!filter) return

            const filterValues = parseFilterValues(filter.value)
            syncCustomFields(filterValues, addCustomFieldIdToSync)

            const newFormValues = computeFormValues(filterValues, defaultFormValues)

            resetForm(() => newFormValues, { keepValues: false })

            // Delay to allow form reset to complete before updating column filters
            setTimeout(() => setColumnFilters(filterValues), 1000)
        },
        [defaultFormValues, resetForm, setColumnFilters, addCustomFieldIdToSync],
    )

    // Update existing filter with current filter state
    const updateFilter = useCallback(() => {
        if (!savedFilter) return

        toast.promise(
            new Promise((resolve, reject) => {
                updateSavedFilter(
                    {
                        where: { uid: savedFilter.uid },
                        update: { value: JSON.stringify(storeFilters) },
                    },
                    {
                        onError: reject,
                        onSuccess: () => {
                            refetch()
                            formMethods.setValue('savedFilter', {
                                ...savedFilter,
                                value: JSON.stringify(storeFilters),
                            })
                            resolve(true)
                        },
                    },
                )
            }),
            {
                loading: 'Updating filter...',
                success: 'Filter updated',
                error: 'Failed to update filter',
            },
        )
    }, [savedFilter, storeFilters, updateSavedFilter, refetch, formMethods])

    // Delete selected filter
    const deleteFilter = useCallback(() => {
        if (!savedFilter) return

        toast.promise(
            new Promise((resolve, reject) => {
                deleteSavedFilter(
                    { where: { uid: savedFilter.uid } },
                    {
                        onError: reject,
                        onSuccess: () => {
                            formMethods.setValue('savedFilter', null)
                            resetForm(defaultFormValues, { keepValues: false })
                            refetch()
                            resolve(true)
                        },
                    },
                )
            }),
            {
                loading: 'Deleting filter...',
                success: 'Filter deleted',
                error: 'Failed to delete filter',
            },
        )
    }, [savedFilter, deleteSavedFilter, formMethods, resetForm, defaultFormValues, refetch])

    // Create new filter
    const createFilter = useCallback(
        (name: string, onSuccess?: () => void) => {
            if (!user?.uid) return

            const filterKey = `filter-${tableId}-${name.toLowerCase().split(' ').join('')}`

            toast.promise(
                new Promise((resolve, reject) => {
                    createUserSettings(
                        {
                            input: [
                                {
                                    key: filterKey,
                                    name,
                                    value: JSON.stringify(storeFilters),
                                    user: {
                                        connect: {
                                            where: { node: { uid: user.uid } },
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            onError: reject,
                            onSuccess: () => {
                                refetch()
                                onSuccess?.()
                                resolve(true)
                            },
                        },
                    )
                }),
                {
                    loading: 'Creating filter...',
                    success: 'Filter created',
                    error: 'Failed to create filter',
                },
            )
        },
        [tableId, storeFilters, user?.uid, createUserSettings, refetch],
    )

    return {
        // State
        filters,
        savedFilter,
        storeFilters,
        formMethods,

        // Actions
        applyFilter,
        updateFilter,
        deleteFilter,
        createFilter,

        // Derived state
        canUpdate: storeFilters.length > 0 && !!savedFilter,
        canSaveNew: storeFilters.length > 0,
    }
}
