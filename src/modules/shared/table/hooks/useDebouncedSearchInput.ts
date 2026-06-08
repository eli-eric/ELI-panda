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
    // When URL sync is disabled (modal-local search) the global `?search=` param
    // is irrelevant and must be ignored, otherwise the input prefills with an
    // unrelated page search while the table/query reads store only.
    const initialValue = useRef(
        (enableQueryURL ? (querySearch ?? storeSearch) : storeSearch) ?? '',
    ).current

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
    //
    // Priority `storeSearch ?? querySearch`: Zustand updates synchronously on commit,
    // URL (next-usequerystate) updates async. Reading store first avoids the brief
    // window where store has new value but URL is still stale. Back-button URL sync is
    // not affected because `{ history: 'replace' }` (see useQueryState options above)
    // means search-value typing does NOT create history entries — so there is no
    // "back through search values" scenario that would require URL priority. Bookmarked
    // URL + remount is handled by the lazy initialValue above, not by this effect.
    //
    // Also cancel any pending debounced commit: if user was mid-typing when external
    // clear landed, we must not let the stale timer revert the external state (500ms
    // later the timer would fire with the abandoned typed text).
    useEffect(() => {
        const next = (enableQueryURL ? (storeSearch ?? querySearch) : storeSearch) ?? ''
        if (next === lastCommittedRef.current) return
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        lastCommittedRef.current = next
        if (inputRef.current && inputRef.current.value !== next) {
            inputRef.current.value = next
        }
    }, [querySearch, storeSearch, enableQueryURL])

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
