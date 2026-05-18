import { act } from '@testing-library/react'

import { useDarkModeStore } from '../useDarkModeStore'

const resetStore = () => {
    act(() => useDarkModeStore.setState({ isDark: false }))
    document.documentElement.classList.remove('dark')
}

describe('useDarkModeStore', () => {
    beforeEach(resetStore)

    it('defaults to light mode', () => {
        expect(useDarkModeStore.getState().isDark).toBe(false)
    })

    it('toggleDarkMode flips state and toggles documentElement class', () => {
        act(() => useDarkModeStore.getState().toggleDarkMode())
        expect(useDarkModeStore.getState().isDark).toBe(true)
        expect(document.documentElement.classList.contains('dark')).toBe(true)

        act(() => useDarkModeStore.getState().toggleDarkMode())
        expect(useDarkModeStore.getState().isDark).toBe(false)
        expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('turnDarkModeOn / turnDarkModeOff set state explicitly', () => {
        act(() => useDarkModeStore.getState().turnDarkModeOn())
        expect(useDarkModeStore.getState().isDark).toBe(true)
        act(() => useDarkModeStore.getState().turnDarkModeOff())
        expect(useDarkModeStore.getState().isDark).toBe(false)
    })

    it('setStoredTheme adds dark class when persisted state is dark', () => {
        act(() => useDarkModeStore.setState({ isDark: true }))
        useDarkModeStore.getState().setStoredTheme()
        expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('setStoredTheme does nothing when state is light', () => {
        useDarkModeStore.getState().setStoredTheme()
        expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
})
