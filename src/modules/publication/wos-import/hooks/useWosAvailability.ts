import { create } from 'zustand'

/**
 * Session memo: once the API reports WOS_NOT_CONFIGURED, every WoS button hides
 * until the page reloads instead of probing a provider that cannot answer.
 */
type WosAvailabilityState = {
    notConfigured: boolean
}

const useWosAvailabilityStore = create<WosAvailabilityState>(() => ({
    notConfigured: false,
}))

export const markWosNotConfigured = () => useWosAvailabilityStore.setState({ notConfigured: true })

/** Starts a fresh session; tests use it to isolate the session memo. */
export const resetWosAvailability = () => useWosAvailabilityStore.setState({ notConfigured: false })

/** False once any lookup in this session has reported WOS_NOT_CONFIGURED. */
export const useWosAvailability = () => !useWosAvailabilityStore(state => state.notConfigured)
