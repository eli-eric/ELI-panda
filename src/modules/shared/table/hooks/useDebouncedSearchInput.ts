import { useQueryState } from 'next-usequerystate'
import type { ChangeEvent } from 'react'
import { useEffect, useRef, useTransition } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

interface Options {
    tableId: string
    /** Whether to keep URL query `?search=` in sync (replace history) */
    enableQueryURL?: boolean
    /** Optional external callback invoked with committed debounced value */
    onChange?: (value: string) => void
    /** Debounce delay in ms (default 500) */
    delay?: number
}

interface UseDebouncedSearchInputResult {
    inputRef: React.RefObject<HTMLInputElement | null>
    /** Initial value captured on first mount — pass to Input's defaultValue */
    defaultValue: string
    /** onChange handler to attach to the input */
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Reusable uncontrolled search input with debounced commit.
 *
 * - DOM holds user-input via ref + defaultValue (no React state for display)
 * - Committed value written to `useTableStateStore.setSearch` and optionally URL
 * - External changes to committed search sync back to DOM imperatively
 * - `lastCommittedRef` skips echo of our own commit (store updates sync, URL async)
 *
 * Used by shared SearchBar (all tables) and LeavesToolbar.
 */
export const useDebouncedSearchInput = ({
    tableId,
    enableQueryURL = true,
    onChange,
    delay = 500,
}: Options): UseDebouncedSearchInputResult => {
    const [querySearch, setQuerySearch] = useQueryState('search', {
        history: 'replace',
    })

    const setSearch = useTableStateStore(s => s.setSearch)
    const storeSearch = useTableStateStore(s => s.instances[tableId]?.search)

    // `??` not `||` so `?search=` (empty string) stays authoritative
    // over a stale store value — consistent with the sync effect below.
    const initialValue = useRef(querySearch ?? storeSearch ?? '').current

    const inputRef = useRef<HTMLInputElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const lastCommittedRef = useRef(initialValue)

    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    const [, startTransition] = useTransition()

    // External sync: when committed search changes externally (e.g., clear filters button
    // or URL back-nav), mirror to the DOM imperatively. Using `??` (not `||`) so an
    // empty-string commit ('') stays authoritative — `||` would fall back to stale
    // querySearch during our own commit window and cause a flash.
    useEffect(() => {
        const next = storeSearch ?? querySearch ?? ''
        if (next === lastCommittedRef.current) return
        lastCommittedRef.current = next
        if (inputRef.current && inputRef.current.value !== next) {
            inputRef.current.value = next
        }
    }, [querySearch, storeSearch])

    useEffect(
        () => () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        },
        [],
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            lastCommittedRef.current = value
            if (onChangeRef.current) onChangeRef.current(value)
            startTransition(() => {
                setSearch(tableId, value)
                if (enableQueryURL) {
                    setQuerySearch(value || '', { shallow: true })
                }
            })
        }, delay)
    }

    return {
        inputRef,
        defaultValue: initialValue,
        handleChange,
    }
}
