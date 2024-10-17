import { create } from 'zustand'

type SearchStore = {
  value: string
  setSearchValue: (value: string) => void
}

export const useSearchStore = create<SearchStore>(set => ({
  value: '',
  setSearchValue: (value: string) => set(() => ({ value }))
}))
