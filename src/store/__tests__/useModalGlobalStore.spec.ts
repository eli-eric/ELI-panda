import { act } from '@testing-library/react'

import { useModalGlobalStore } from '../useModalGlobalStore'

const DummyComponent = () => null

const slotResetState = {
    sheet: { isOpen: false, component: null, props: {}, priority: 0 },
    dialog1: { isOpen: false, component: null, props: {}, priority: 1 },
    dialog2: { isOpen: false, component: null, props: {}, priority: 2 },
    dialog3: { isOpen: false, component: null, props: {}, priority: 3 },
}

describe('useModalGlobalStore', () => {
    beforeEach(() => act(() => useModalGlobalStore.getState().resetAll()))

    it('starts with all slots closed', () => {
        const state = useModalGlobalStore.getState()
        expect(state.sheet.isOpen).toBe(false)
        expect(state.dialog1.isOpen).toBe(false)
        expect(state.dialog2.isOpen).toBe(false)
        expect(state.dialog3.isOpen).toBe(false)
    })

    it('openModal populates target slot and flips isOpen', () => {
        const onSubmit = jest.fn()
        act(() =>
            useModalGlobalStore.getState().openModal('dialog1', {
                component: DummyComponent,
                props: { title: 'hi' },
                onSubmit,
            }),
        )
        const slot = useModalGlobalStore.getState().dialog1
        expect(slot.isOpen).toBe(true)
        expect(slot.component).toBe(DummyComponent)
        expect(slot.props).toEqual({ title: 'hi' })
        expect(slot.onSubmit).toBe(onSubmit)
        expect(slot.priority).toBe(1)
    })

    it('closeModal flips isOpen but keeps component reference', () => {
        act(() =>
            useModalGlobalStore.getState().openModal('sheet', { component: DummyComponent }),
        )
        act(() => useModalGlobalStore.getState().closeModal('sheet'))
        const slot = useModalGlobalStore.getState().sheet
        expect(slot.isOpen).toBe(false)
        expect(slot.component).toBe(DummyComponent)
    })

    it('resetAll wipes all slots to defaults', () => {
        act(() => {
            useModalGlobalStore.getState().openModal('sheet', { component: DummyComponent })
            useModalGlobalStore.getState().openModal('dialog2', { component: DummyComponent })
        })
        act(() => useModalGlobalStore.getState().resetAll())
        const state = useModalGlobalStore.getState()
        expect(state.sheet).toMatchObject(slotResetState.sheet)
        expect(state.dialog2).toMatchObject(slotResetState.dialog2)
    })
})
