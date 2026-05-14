import { act } from '@testing-library/react'

import { useSystemContext } from '../useSystemContext'

const reset = () => act(() => useSystemContext.setState({ blockedEdit: false }))

describe('useSystemContext', () => {
    beforeEach(reset)

    it('defaults to blockedEdit=false', () => {
        expect(useSystemContext.getState().blockedEdit).toBe(false)
    })

    it('setBlockedEdit toggles the flag', () => {
        act(() => useSystemContext.getState().setBlockedEdit(true))
        expect(useSystemContext.getState().blockedEdit).toBe(true)
        act(() => useSystemContext.getState().setBlockedEdit(false))
        expect(useSystemContext.getState().blockedEdit).toBe(false)
    })
})
