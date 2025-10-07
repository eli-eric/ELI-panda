import { create } from 'zustand'

interface SystemCreateParentState {
  parentUid: string | null

  // Actions
  setParentUid: (uid: string | null | undefined) => void
  clear: () => void
}

export const useSystemCreateParentStore = create<SystemCreateParentState>(
  set => ({
    parentUid: null,
    setParentUid: uid => set({ parentUid: uid || null }),
    clear: () => set({ parentUid: null })
  })
)
