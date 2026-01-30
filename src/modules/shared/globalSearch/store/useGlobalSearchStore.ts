import { createWithEqualityFn as create } from 'zustand/traditional'

type GlobalSearchStore = {
    searchValue: string
    open: boolean
    setSearchValue: (searchValue: string) => void
    setOpen: (open: boolean) => void
    clearSearch: () => void
    toggleOpen: () => void
}

export const useGlobalSearchStore = create<GlobalSearchStore>(set => ({
    searchValue: '',
    open: false,
    setSearchValue: searchValue => set({ searchValue }),
    setOpen: open => set({ open }),
    clearSearch: () => set({ searchValue: '' }),
    toggleOpen: () => set(state => ({ open: !state.open })),
}))
