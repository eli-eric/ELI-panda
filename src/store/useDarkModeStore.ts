import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type DarkModeStore = {
    isDark: boolean
    toggleDarkMode: () => void
    turnDarkModeOn: () => void
    turnDarkModeOff: () => void
    setStoredTheme: () => void
}

export const useDarkModeStore = create<DarkModeStore>()(
    persist(
        (set, get) => ({
            isDark: false,
            toggleDarkMode: () => {
                set({ isDark: get().isDark ? false : true })
                document.documentElement.classList.toggle('dark')
            },
            turnDarkModeOn: () => set({ isDark: true }),
            turnDarkModeOff: () => set({ isDark: false }),
            setStoredTheme: () => {
                if (get().isDark) document.documentElement.classList.add('dark')
            },
        }),
        {
            name: 'theme', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)
