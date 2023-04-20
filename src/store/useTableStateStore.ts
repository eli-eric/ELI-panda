import { SortingRule } from 'react-table'
import { create } from 'zustand'

type SortingInstance = {
  sortBy: SortingRule<{}>[]
  currentPage: number
  pageSize: number
}

type SortingState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  setCurrentPage: (tableId: string, currentPage: number) => void
  setPageSize: (tableId: string, pageSize: number) => void
  resetSortBy: (tableId: string) => void
}

const useTableStateStore = create<SortingState>(set => ({
  instances: {},
  setSortBy: (tableId, sortBy) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], sortBy }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  setCurrentPage: (tableId, currentPage) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], currentPage }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  setPageSize: (tableId, pageSize) =>
    set(state => {
      const newInstance = { ...state.instances[tableId], pageSize }
      return { instances: { ...state.instances, [tableId]: newInstance } }
    }),
  resetSortBy: tableId =>
    set(state => {
      const newInstances = { ...state.instances }
      delete newInstances[tableId]
      return { instances: newInstances }
    })
}))

export default useTableStateStore
