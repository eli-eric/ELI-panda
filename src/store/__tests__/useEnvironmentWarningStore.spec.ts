import { act } from '@testing-library/react'

import { useEnvironmentWarningStore } from '../useEnvironmentWarningStore'

describe('useEnvironmentWarningStore', () => {
    beforeEach(() =>
        act(() => useEnvironmentWarningStore.setState({ hasConfirmedEnvironment: false })),
    )

    it('defaults to unconfirmed', () => {
        expect(useEnvironmentWarningStore.getState().hasConfirmedEnvironment).toBe(false)
    })

    it('confirmEnvironment sets confirmed flag', () => {
        act(() => useEnvironmentWarningStore.getState().confirmEnvironment())
        expect(useEnvironmentWarningStore.getState().hasConfirmedEnvironment).toBe(true)
    })

    it('confirmEnvironment is idempotent', () => {
        act(() => useEnvironmentWarningStore.getState().confirmEnvironment())
        act(() => useEnvironmentWarningStore.getState().confirmEnvironment())
        expect(useEnvironmentWarningStore.getState().hasConfirmedEnvironment).toBe(true)
    })
})
