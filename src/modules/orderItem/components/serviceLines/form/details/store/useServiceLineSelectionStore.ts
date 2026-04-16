import type { ReactNode } from 'react'
import { createContext, createElement, useContext, useRef } from 'react'
import { createStore, useStore } from 'zustand'

interface ServiceLineSelectionState {
    selectedProperties: string[]
    setSelectedProperties: (properties: string[]) => void
    toggleProperty: (propertyUid: string) => void
    isPropertySelected: (propertyUid: string) => boolean
    clearSelections: () => void
}

type SelectionStoreApi = ReturnType<typeof createSelectionStore>

const createSelectionStore = () =>
    createStore<ServiceLineSelectionState>((set, get) => ({
        selectedProperties: [],

        setSelectedProperties: properties => {
            set({ selectedProperties: properties })
        },

        toggleProperty: propertyUid => {
            const { selectedProperties } = get()
            const isAlreadySelected = selectedProperties.includes(propertyUid)

            if (isAlreadySelected) {
                set({
                    selectedProperties: selectedProperties.filter(uid => uid !== propertyUid),
                })
            } else {
                set({
                    selectedProperties: [...selectedProperties, propertyUid],
                })
            }
        },

        isPropertySelected: propertyUid => {
            return get().selectedProperties.includes(propertyUid)
        },

        clearSelections: () => {
            set({ selectedProperties: [] })
        },
    }))

const SelectionStoreContext = createContext<SelectionStoreApi | null>(null)

export const ServiceLineSelectionProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<SelectionStoreApi | null>(null)
    if (!storeRef.current) {
        storeRef.current = createSelectionStore()
    }
    return createElement(
        SelectionStoreContext.Provider,
        { value: storeRef.current },
        children,
    )
}

export const useServiceLineSelectionStore = (): ServiceLineSelectionState => {
    const store = useContext(SelectionStoreContext)
    if (!store) {
        throw new Error(
            'useServiceLineSelectionStore must be used within ServiceLineSelectionProvider',
        )
    }
    return useStore(store, state => state)
}
