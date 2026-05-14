import { act } from '@testing-library/react'

import useMutateListStore from '../useMutateListStore'

describe('useMutateListStore', () => {
    beforeEach(() => act(() => useMutateListStore.setState({ instances: {} })))

    it('starts empty', () => {
        expect(useMutateListStore.getState().instances).toEqual({})
    })

    it('setMutate stores a mutateUrl by id', () => {
        act(() => useMutateListStore.getState().setMutate('a', '/api/x'))
        expect(useMutateListStore.getState().instances.a).toEqual({ mutateUrl: '/api/x' })
    })

    it('setMutate overwrites mutateUrl for the same id', () => {
        act(() => {
            useMutateListStore.getState().setMutate('a', '/v1')
            useMutateListStore.getState().setMutate('a', '/v2')
        })
        expect(useMutateListStore.getState().instances.a).toEqual({ mutateUrl: '/v2' })
    })

    it('setMutate keeps other ids intact', () => {
        act(() => {
            useMutateListStore.getState().setMutate('a', '/a-url')
            useMutateListStore.getState().setMutate('b', '/b-url')
        })
        expect(useMutateListStore.getState().instances).toEqual({
            a: { mutateUrl: '/a-url' },
            b: { mutateUrl: '/b-url' },
        })
    })

    it('reset removes the instance for the given id only', () => {
        act(() => {
            useMutateListStore.getState().setMutate('a', '/a')
            useMutateListStore.getState().setMutate('b', '/b')
        })
        act(() => useMutateListStore.getState().reset('a'))
        expect(useMutateListStore.getState().instances).toEqual({ b: { mutateUrl: '/b' } })
    })
})
