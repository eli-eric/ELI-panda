import type { SortingState } from '@tanstack/react-table'
import { create } from 'zustand'

import type { QueryFilter } from '@/modules/orders/types'

type SortingInstance = {
  sortBy?: SortingState
  sortByQueryString?: string
  pagination?: string
  filter?: QueryFilter
  search?: string
}

type TableState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  setSortByQueryString: (tableId: string, sortByQueryString: SortingInstance['sortByQueryString']) => void
  setPagination: (tableId: string, pagination: SortingInstance['pagination']) => void
  resetSortBy: (tableId: string) => void
  setFilter: (tableId: string, filter: SortingInstance['filter']) => void
  setSearch: (tableId: string, search: SortingInstance['search']) => void
}

const useTableStateStore = create<TableState>(set => ({
  instances: {},
  setSortBy: (tableId, sortBy) =>
    set(state => {
      console.log('setSortBy', tableId, sortBy)
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
  resetSortBy: tableId =>
    set(state => {
      const newInstances = { ...state.instances }
      delete newInstances[tableId]
      return { instances: newInstances }
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
    })
}))

export default useTableStateStore
