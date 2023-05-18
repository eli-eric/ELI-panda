import type { SortingRule } from 'react-table'
import { create } from 'zustand'

type Filter = {
  id: string
  value: string
}

type SortingInstance = {
  sortBy?: SortingRule<{}>[]
  sortByQueryString?: string
  pagination?: string
  filter?: Filter[]
}

type SortingState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  setSortByQueryString: (tableId: string, sortByQueryString: SortingInstance['sortByQueryString']) => void
  setPagination: (tableId: string, pagination: SortingInstance['pagination']) => void
  resetSortBy: (tableId: string) => void
  setFilter: (tableId: string, filter: SortingInstance['filter']) => void
}

const useTableStateStore = create<SortingState>(set => ({
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
  resetSortBy: tableId =>
    set(state => {
      const newInstances = { ...state.instances }
      delete newInstances[tableId]
      return { instances: newInstances }
    }),
  setFilter: (tableId, filter) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], filter }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    })
}))

export default useTableStateStore
