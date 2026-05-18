import { useOrderLineContext, useServiceLineContext } from '../../context'
import { useOrderLine } from '../useOrderLine'
import { useServiceLine } from '../useServiceLine'

jest.mock('../../context', () => ({
    useOrderLineContext: jest.fn(() => ({ lines: ['ol'] })),
    useServiceLineContext: jest.fn(() => ({ lines: ['sl'] })),
}))

describe('useOrderLine alias', () => {
    it('delegates to useOrderLineContext', () => {
        const result = useOrderLine()
        expect(useOrderLineContext).toHaveBeenCalled()
        expect(result).toEqual({ lines: ['ol'] })
    })
})

describe('useServiceLine alias', () => {
    it('delegates to useServiceLineContext', () => {
        const result = useServiceLine()
        expect(useServiceLineContext).toHaveBeenCalled()
        expect(result).toEqual({ lines: ['sl'] })
    })
})
