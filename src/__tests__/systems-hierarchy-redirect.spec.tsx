import { render } from '@testing-library/react'
import React from 'react'

import SystemsHierarchyRedirectPage from '@/pages/systems/hierarchy'

const mockReplace = jest.fn()
let mockQuery: Record<string, string | string[] | undefined> = {}
let mockIsReady = true

jest.mock('next/router', () => ({
    useRouter: () => ({
        isReady: mockIsReady,
        query: mockQuery,
        replace: mockReplace,
    }),
}))

jest.mock('@/components/loader.comp', () => ({
    __esModule: true,
    default: () => null,
}))

describe('/systems/hierarchy legacy redirect', () => {
    beforeEach(() => {
        mockReplace.mockClear()
        mockQuery = {}
        mockIsReady = true
    })

    it('forwards to the Systems Explorer keeping the query string', () => {
        mockQuery = { parent: 'p-1', leaf: 'l-1', tab: 'history' }
        render(<SystemsHierarchyRedirectPage />)
        expect(mockReplace).toHaveBeenCalledWith({
            pathname: '/systems/explorer',
            query: { parent: 'p-1', leaf: 'l-1', tab: 'history' },
        })
    })

    it('does nothing until the router is ready', () => {
        mockIsReady = false
        render(<SystemsHierarchyRedirectPage />)
        expect(mockReplace).not.toHaveBeenCalled()
    })
})
