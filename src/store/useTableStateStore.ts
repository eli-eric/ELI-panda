import type { SortingState } from '@tanstack/react-table'
import { create } from 'zustand'

import type { QueryFilter } from '@/modules/orders/types'

type SortingInstance = {
  sortBy?: SortingState
  sortByQueryString?: string
  pagination?: string
  filter?: QueryFilter
  search?: string
  custom?: Record<string, any>
}

type TableState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  setSortByQueryString: (tableId: string, sortByQueryString: SortingInstance['sortByQueryString']) => void
  setPagination: (tableId: string, pagination: SortingInstance['pagination']) => void
  reset: (tableId: string) => void
  setFilter: (tableId: string, filter: SortingInstance['filter']) => void
  setSearch: (tableId: string, search: SortingInstance['search']) => void
  setCustom: (tableId: string, custom: SortingInstance['custom']) => void
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
    })
}))

export default useTableStateStore
