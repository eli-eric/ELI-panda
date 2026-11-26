import { useSystemEditSectionsStore } from '../useSystemEditSectionsStore'

describe('useSystemEditSectionsStore', () => {
    beforeEach(() => {
        localStorage.clear()
        useSystemEditSectionsStore.setState({ openSections: {} })
    })

    it('stores only toggled sections and persists them to localStorage', () => {
        useSystemEditSectionsStore.getState().setSectionOpen('subsystems', true)
        useSystemEditSectionsStore.getState().setSectionOpen('people', false)

        expect(useSystemEditSectionsStore.getState().openSections).toEqual({
            subsystems: true,
            people: false,
        })
        const persisted = JSON.parse(localStorage.getItem('system-edit-sections') ?? '{}')
        expect(persisted.state.openSections).toEqual({ subsystems: true, people: false })
    })
})
