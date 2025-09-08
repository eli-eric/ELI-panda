import { create } from 'zustand'

import type { SystemLevel } from '@/types/gql/graphql'

interface ParentSystemData {
  uid: string
  name: string
  systemLevel?: SystemLevel | null
  responsible?: {
    uid: string
    fullName: string
  } | null
  location?: {
    uid: string
    name: string
  } | null
  zone?: {
    uid: string
    name: string
  } | null
}

interface ParentPathItem {
  uid: string
  name: string
  systemLevel?: SystemLevel | null
}

interface SystemCreateParentState {
  parentUid: string | null
  
  // Actions
  setParentUid: (uid: string | null | undefined) => void
  clear: () => void
}

export const useSystemCreateParentStore = create<SystemCreateParentState>((set) => ({
  parentUid: null,

  setParentUid: (uid) => set({ parentUid: uid || null }),
  clear: () => set({ parentUid: null })
}))