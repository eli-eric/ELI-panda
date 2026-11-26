import { create } from 'zustand'

interface SystemEditConfirmationState {
    // Systems the user already confirmed editing outside their responsibility.
    // Session-only on purpose (not persisted): the question comes back after a reload.
    confirmedUids: ReadonlySet<string>
    confirm: (uid: string) => void
    isConfirmed: (uid: string) => boolean
    reset: () => void
}

export const useSystemEditConfirmationStore = create<SystemEditConfirmationState>((set, get) => ({
    confirmedUids: new Set(),
    confirm: uid => set(state => ({ confirmedUids: new Set(state.confirmedUids).add(uid) })),
    isConfirmed: uid => get().confirmedUids.has(uid),
    reset: () => set({ confirmedUids: new Set() }),
}))
