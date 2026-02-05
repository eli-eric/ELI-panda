import { useEffect, useState } from 'react'

interface UseGlobalSearchShortcutOptions {
    onToggle: () => void
    enabled?: boolean
}

/**
 * Detects the user's operating system
 * Returns true if macOS (CMD key), false otherwise (CTRL key)
 */
const isMacOS = (): boolean => {
    if (typeof window === 'undefined') return false
    return /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
}

/**
 * Hook for handling global search keyboard shortcut
 * CMD+K on macOS, CTRL+K on other platforms
 */
export const useGlobalSearchShortcut = ({
    onToggle,
    enabled = true,
}: UseGlobalSearchShortcutOptions) => {
    // Prevent hydration mismatch by detecting OS on client only
    const [shortcutDisplay, setShortcutDisplay] = useState('Ctrl+K')

    useEffect(() => {
        // Set correct shortcut on client mount
        setShortcutDisplay(isMacOS() ? '⌘K' : 'Ctrl+K')
    }, [])

    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = isMacOS()
            const isCorrectModifier = isMac ? event.metaKey : event.ctrlKey

            // Check for CMD+K (Mac) or CTRL+K (others)
            if (event.key === 'k' && isCorrectModifier) {
                event.preventDefault()
                event.stopPropagation()
                onToggle()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onToggle, enabled])

    return { shortcutDisplay }
}
