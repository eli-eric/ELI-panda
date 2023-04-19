import { create } from 'zustand'

type SortingInstance = {
  sortConfig: {
    key: string | null
    direction: 'asc' | 'desc' | null
  }
}

type SortingState = {
  instances: Record<string, SortingInstance>
  setSortConfig: (tableId: string, sortConfig: SortingInstance['sortConfig']) => void
  resetSortConfig: (tableId: string) => void
}

const useSortingStore = create<SortingState>(set => ({
  instances: {},
  setSortConfig: (tableId, sortConfig) =>
    set(state => ({ instances: { ...state.instances, [tableId]: { sortConfig } } })),
  resetSortConfig: tableId =>
    set(state => {
      const newInstances = { ...state.instances }
      delete newInstances[tableId]
      return { instances: newInstances }
    })
}))

export default useSortingStore
