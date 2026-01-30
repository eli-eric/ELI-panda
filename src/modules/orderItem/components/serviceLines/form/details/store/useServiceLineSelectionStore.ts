import { create } from 'zustand'

interface ServiceLineSelectionState {
    selectedProperties: string[]
    setSelectedProperties: (properties: string[]) => void
    toggleProperty: (propertyUid: string) => void
    isPropertySelected: (propertyUid: string) => boolean
    clearSelections: () => void
}

export const useServiceLineSelectionStore = create<ServiceLineSelectionState>((set, get) => ({
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
