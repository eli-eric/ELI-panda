import { useSyncExternalStore } from 'react'

// Session memo: once the API reports WOS_NOT_CONFIGURED, every WoS button hides
// until the page reloads instead of probing a provider that cannot answer.
let notConfigured = false
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => {
        listeners.delete(listener)
    }
}

const getSnapshot = () => notConfigured

export const markWosNotConfigured = () => {
    if (notConfigured) return
    notConfigured = true
    listeners.forEach(listener => listener())
}

/** Starts a fresh session; tests use it to isolate the module-level memo. */
export const resetWosAvailability = () => {
    notConfigured = false
    listeners.forEach(listener => listener())
}

/** False once any lookup in this session has reported WOS_NOT_CONFIGURED. */
export const useWosAvailability = () => !useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
