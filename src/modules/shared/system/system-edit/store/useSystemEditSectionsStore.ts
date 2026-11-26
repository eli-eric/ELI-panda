import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SystemEditSectionId =
    | 'details'
    | 'people'
    | 'physicalItem'
    | 'properties'
    | 'orders'
    | 'spareParts'
    | 'spareFor'
    | 'subsystems'
    | 'activity'

interface SystemEditSectionsStore {
    // only sections the user toggled; the rest fall back to their default
    openSections: Partial<Record<SystemEditSectionId, boolean>>
    setSectionOpen: (id: SystemEditSectionId, open: boolean) => void
}

/** Which Edit System sheet sections the user keeps open — remembered across systems and reloads. */
export const useSystemEditSectionsStore = create<SystemEditSectionsStore>()(
    persist(
        set => ({
            openSections: {},
            setSectionOpen: (id, open) =>
                set(state => ({ openSections: { ...state.openSections, [id]: open } })),
        }),
        { name: 'system-edit-sections' },
    ),
)
