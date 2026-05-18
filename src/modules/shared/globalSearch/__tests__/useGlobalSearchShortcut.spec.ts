import { renderHook } from '@testing-library/react'

import { useGlobalSearchShortcut } from '../hooks/useGlobalSearchShortcut'

const fireKey = (init: Partial<KeyboardEventInit> & { key: string }) => {
    const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init })
    jest.spyOn(event, 'preventDefault')
    jest.spyOn(event, 'stopPropagation')
    window.dispatchEvent(event)
    return event
}

describe('useGlobalSearchShortcut', () => {
    const originalPlatform = window.navigator.platform

    const setPlatform = (value: string) => {
        Object.defineProperty(window.navigator, 'platform', { value, configurable: true })
    }

    afterEach(() => {
        setPlatform(originalPlatform)
    })

    it('reports Ctrl+K on non-mac platforms after mount', () => {
        setPlatform('Win32')
        const { result } = renderHook(() => useGlobalSearchShortcut({ onToggle: jest.fn() }))
        expect(result.current.shortcutDisplay).toBe('Ctrl+K')
    })

    it('reports ⌘K on macOS after mount', () => {
        setPlatform('MacIntel')
        const { result } = renderHook(() => useGlobalSearchShortcut({ onToggle: jest.fn() }))
        expect(result.current.shortcutDisplay).toBe('⌘K')
    })

    it('triggers onToggle on Ctrl+K on non-mac', () => {
        setPlatform('Win32')
        const onToggle = jest.fn()
        renderHook(() => useGlobalSearchShortcut({ onToggle }))

        const event = fireKey({ key: 'k', ctrlKey: true })
        expect(onToggle).toHaveBeenCalledTimes(1)
        expect(event.preventDefault).toHaveBeenCalled()
        expect(event.stopPropagation).toHaveBeenCalled()
    })

    it('triggers onToggle on Cmd+K on mac', () => {
        setPlatform('MacIntel')
        const onToggle = jest.fn()
        renderHook(() => useGlobalSearchShortcut({ onToggle }))

        fireKey({ key: 'k', metaKey: true })
        expect(onToggle).toHaveBeenCalledTimes(1)
    })

    it('ignores wrong modifier (ctrl on mac, meta on non-mac)', () => {
        setPlatform('MacIntel')
        const onToggle = jest.fn()
        renderHook(() => useGlobalSearchShortcut({ onToggle }))

        fireKey({ key: 'k', ctrlKey: true })
        expect(onToggle).not.toHaveBeenCalled()
    })

    it('does not bind when enabled is false', () => {
        setPlatform('Win32')
        const onToggle = jest.fn()
        renderHook(() => useGlobalSearchShortcut({ onToggle, enabled: false }))

        fireKey({ key: 'k', ctrlKey: true })
        expect(onToggle).not.toHaveBeenCalled()
    })

    it('removes listener on unmount', () => {
        setPlatform('Win32')
        const onToggle = jest.fn()
        const { unmount } = renderHook(() => useGlobalSearchShortcut({ onToggle }))

        unmount()
        fireKey({ key: 'k', ctrlKey: true })
        expect(onToggle).not.toHaveBeenCalled()
    })

    it('only matches the "k" key', () => {
        setPlatform('Win32')
        const onToggle = jest.fn()
        renderHook(() => useGlobalSearchShortcut({ onToggle }))

        fireKey({ key: 'j', ctrlKey: true })
        fireKey({ key: 'a', ctrlKey: true })
        expect(onToggle).not.toHaveBeenCalled()
    })
})
