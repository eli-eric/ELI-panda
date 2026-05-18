import { act } from '@testing-library/react'

import { useShowDeviceStore, useSystemStore } from '../useShowDeviceStore'

const reset = () =>
    act(() =>
        useSystemStore.setState({
            openDeviceInfo: false,
            uid: undefined,
            code: undefined,
            locationCode: undefined,
        }),
    )

describe('useSystemStore / useShowDeviceStore', () => {
    beforeEach(reset)

    it('useShowDeviceStore is an alias of useSystemStore', () => {
        expect(useShowDeviceStore).toBe(useSystemStore)
    })

    it('setOpenDeviceInfo flips flag', () => {
        act(() => useSystemStore.getState().setOpenDeviceInfo(true))
        expect(useSystemStore.getState().openDeviceInfo).toBe(true)
    })

    it('setUID clears code and locationCode', () => {
        act(() => {
            useSystemStore.getState().setCode('C')
            useSystemStore.getState().setLocationCode('L')
        })
        act(() => useSystemStore.getState().setUID('U'))
        const s = useSystemStore.getState()
        expect(s.uid).toBe('U')
        expect(s.code).toBeUndefined()
        expect(s.locationCode).toBeUndefined()
    })

    it('setCode clears uid and locationCode', () => {
        act(() => useSystemStore.getState().setUID('U'))
        act(() => useSystemStore.getState().setCode('C'))
        const s = useSystemStore.getState()
        expect(s.code).toBe('C')
        expect(s.uid).toBeUndefined()
        expect(s.locationCode).toBeUndefined()
    })

    it('setLocationCode clears code and uid', () => {
        act(() => useSystemStore.getState().setUID('U'))
        act(() => useSystemStore.getState().setLocationCode('L'))
        const s = useSystemStore.getState()
        expect(s.locationCode).toBe('L')
        expect(s.uid).toBeUndefined()
        expect(s.code).toBeUndefined()
    })
})
