import { SortingRule } from 'react-table'
import { create } from 'zustand'

type SortingInstance = {
  sortBy: SortingRule<{}>[]
}

type SortingState = {
  instances: Record<string, SortingInstance>
  setSortBy: (tableId: string, sortBy: SortingInstance['sortBy']) => void
  resetSortBy: (tableId: string) => void
}

const useSortingStore = create<SortingState>(set => ({
  instances: {},
  setSortBy: (tableId, sortBy) => set(state => ({ instances: { ...state.instances, [tableId]: { sortBy } } })),
  resetSortBy: tableId =>
    set(state => {
      const newInstances = { ...state.instances }
      delete newInstances[tableId]
      return { instances: newInstances }
    })
}))

export default useSortingStore
