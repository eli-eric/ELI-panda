import type {
  ColumnFilter,
  ColumnOrderState,
  ExpandedState,
  RowSelectionState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn as create } from 'zustand/traditional'

import type { QueryFilter } from '@/modules/orders/types'

type SortingInstance = {
  sortBy?: SortingState
  rowSelection?: RowSelectionState
  sortByQueryString?: string
  pagination?: string
  filter?: QueryFilter
  columnFilter?: ColumnFilter[]
  search?: string
  searchBarValue?: string
  custom?: Record<string, any>
  columnVisibility?: VisibilityState
  expanded?: ExpandedState
  columnOrder?: ColumnOrderState
}

type TableState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  setRowSelection: (
    tableId: string,
    rowSelection: SortingInstance['rowSelection']
  ) => void
  setSortByQueryString: (
    tableId: string,
    sortByQueryString: SortingInstance['sortByQueryString']
  ) => void
  setPagination: (
    tableId: string,
    pagination: SortingInstance['pagination']
  ) => void
  reset: (tableId: string) => void
  setFilter: (tableId: string, filter: SortingInstance['filter']) => void
  setColumnFilter: (
    tableId: string,
    columnFilter: SortingInstance['columnFilter']
  ) => void
  setSearch: (tableId: string, search: SortingInstance['search']) => void
  setSearchValue: (
    tableId: string,
    searchBarValue: SortingInstance['searchBarValue']
  ) => void
  setCustom: (tableId: string, custom: SortingInstance['custom']) => void
  setVisibility: (
    tableId: string,
    columnVisibility: SortingInstance['columnVisibility']
  ) => void
  setExpand: (tableId: string, expanded: SortingInstance['expanded']) => void
  setOrder: (
    tableId: string,
    columnOrder: SortingInstance['columnOrder']
  ) => void
}

const useTableStateStore = create<TableState>()(
  persist(
    set => {
      const updateInstance = (
        tableId: string,
        key: keyof SortingInstance,
        value: any
      ) => {
        set(state => {
          const instance = state.instances?.[tableId] || {}
          if (value && Object.keys(value).length === 0) {
            delete instance[key]
          } else {
            instance[key] = value
          }
          return {
            instances: { ...state.instances, [tableId]: { ...instance } }
          }
        })
      }

      return {
        instances: {},
        setSortBy: (tableId, sortBy) =>
          updateInstance(tableId, 'sortBy', sortBy),
        setRowSelection: (tableId, rowSelection) =>
          updateInstance(tableId, 'rowSelection', rowSelection),
        setPagination: (tableId, pagination) =>
          updateInstance(tableId, 'pagination', pagination),
        setSortByQueryString: (tableId, sortByQueryString) =>
          updateInstance(tableId, 'sortByQueryString', sortByQueryString),
        setFilter: (tableId, filter) =>
          updateInstance(tableId, 'filter', filter),
        setSearch: (tableId, search) =>
          updateInstance(tableId, 'search', search),
        setCustom: (tableId, custom) =>
          updateInstance(tableId, 'custom', custom),
        setVisibility: (tableId, columnVisibility) =>
          updateInstance(tableId, 'columnVisibility', columnVisibility),
        setExpand: (tableId, expanded) =>
          updateInstance(tableId, 'expanded', expanded),
        setOrder: (tableId, columnOrder) =>
          updateInstance(tableId, 'columnOrder', columnOrder),
        setColumnFilter: (tableId, columnFilter) =>
          updateInstance(tableId, 'columnFilter', columnFilter),
        setSearchValue: (tableId, searchBarValue) =>
          updateInstance(tableId, 'searchBarValue', searchBarValue),
        reset: tableId =>
          set(state => {
            const newInstance = {
              ...state.instances[tableId],
              sortBy: undefined,
              rowSelection: undefined,
              pagination: undefined,
              filter: undefined,
              search: undefined,
              searchBarValue: undefined,
              sortByQueryString: undefined,
              columnFilter: undefined,
              custom: undefined,
              columnVisibility: undefined,
              expanded: undefined,
              columnOrder: undefined
            }
            return { instances: { ...state.instances, [tableId]: newInstance } }
          })
      }
    },
    {
      name: 'table-state-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? sessionStorage : (undefined as any)
      ),
      partialize: state => ({
        instances: Object.fromEntries(
          Object.entries(state.instances).filter(
            ([tableId]) => tableId === 'spare-parts' || tableId === 'for-system'
          )
        )
      })
    }
  )
)

export default useTableStateStore
