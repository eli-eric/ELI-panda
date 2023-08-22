import type {
  ColumnFilter,
  ColumnOrderState,
  ExpandedState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'
import { create } from 'zustand'

import type { QueryFilter } from '@/modules/orders/types'

type SortingInstance = {
  sortBy?: SortingState
  sortByQueryString?: string
  pagination?: string
  filter?: QueryFilter
  columnFilter?: ColumnFilter[]
  search?: string
  custom?: Record<string, any>
  columnVisibility?: VisibilityState
  expanded?: ExpandedState
  columnOrder?: ColumnOrderState
}

type TableState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  setSortByQueryString: (tableId: string, sortByQueryString: SortingInstance['sortByQueryString']) => void
  setPagination: (tableId: string, pagination: SortingInstance['pagination']) => void
  reset: (tableId: string) => void
  setFilter: (tableId: string, filter: SortingInstance['filter']) => void
  setColumFilter: (tableId: string, columnFilter: SortingInstance['columnFilter']) => void
  setSearch: (tableId: string, search: SortingInstance['search']) => void
  setCustom: (tableId: string, custom: SortingInstance['custom']) => void
  setVisibility: (tableId: string, columnVisibility: SortingInstance['columnVisibility']) => void
  setExpand: (tableId: string, expanded: SortingInstance['expanded']) => void
  setOrder: (tableId: string, columnOrder: SortingInstance['columnOrder']) => void
}

const useTableStateStore = create<TableState>(set => ({
  instances: {},
  setSortBy: (tableId, sortBy) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], sortBy }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  setPagination: (tableId, pagination) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], pagination }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  setSortByQueryString: (tableId, sortByQueryString) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], sortByQueryString }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  reset: tableId =>
    set(state => {
      const newInstance = {
        ...state.instances[tableId],
        sortBy: undefined,
        pagination: undefined,
        filter: undefined,
        search: undefined,
        sortByQueryString: undefined
      }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  setFilter: (tableId, filter) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], filter }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (filter && Object.keys(filter).length === 0) {
          delete state.instances[tableId].filter
        } else {
          state.instances[tableId].filter = filter
        }
        return { instances: { ...state.instances } }
      }
    }),
  setSearch: (tableId, search) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], search }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (search === '') {
          delete state.instances[tableId].search
        } else {
          state.instances[tableId].search = search
        }
        return { instances: { ...state.instances } }
      }
    }),
  setCustom: (tableId, custom) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], custom }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (custom && Object.keys(custom).length === 0) {
          delete state.instances[tableId].custom
        } else {
          state.instances[tableId].custom = custom
        }
        return { instances: { ...state.instances } }
      }
    }),
  setVisibility: (tableId, columnVisibility) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], columnVisibility }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (columnVisibility && Object.keys(columnVisibility).length === 0) {
          delete state.instances[tableId].columnVisibility
        } else {
          state.instances[tableId].columnVisibility = columnVisibility
        }
        return { instances: { ...state.instances } }
      }
    }),
  setExpand: (tableId, expanded) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], expanded }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (expanded && Object.keys(expanded).length === 0) {
          delete state.instances[tableId].expanded
        } else {
          state.instances[tableId].expanded = expanded
        }
        return { instances: { ...state.instances } }
      }
    }),
  setOrder: (tableId, columnOrder) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], columnOrder }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (columnOrder && Object.keys(columnOrder).length === 0) {
          delete state.instances[tableId].columnOrder
        } else {
          state.instances[tableId].columnOrder = columnOrder
        }
        return { instances: { ...state.instances } }
      }
    }),
  setColumFilter: (tableId, columnFilter) =>
    set(state => {
      if (!state.instances?.[tableId]) {
        const newInstance = { ...state.instances[tableId], columnFilter }
        return { instances: { ...state.instances, [tableId]: newInstance } }
      } else {
        if (columnFilter && Object.keys(columnFilter).length === 0) {
          delete state.instances[tableId].columnFilter
        } else {
          state.instances[tableId].columnFilter = columnFilter
        }
        return { instances: { ...state.instances } }
      }
    })
}))

export default useTableStateStore
