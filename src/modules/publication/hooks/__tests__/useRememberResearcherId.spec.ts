import { act } from '@testing-library/react'

import { fetchRequest } from '@/core/http/fetchClient'
import { renderHookWithQuery } from '@/testutils/wrappers/renderWithProviders'
import { BASE_URL } from '@/types/constants/common'

import { useRememberResearcherId } from '../useRememberResearcherId'

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequest: jest.fn(),
}))

const mockFetchRequest = fetchRequest as jest.MockedFunction<typeof fetchRequest>

describe('useRememberResearcherId', () => {
    it('stores a confirmed ResearcherID through the researcher REST endpoint', async () => {
        mockFetchRequest.mockResolvedValue(undefined)
        const { result } = renderHookWithQuery(() => useRememberResearcherId())

        await act(async () => {
            await result.current.rememberResearcherId({
                researcherUid: 'researcher-1',
                researcherId: 'A-1234-2024',
            })
        })

        expect(mockFetchRequest).toHaveBeenCalledWith(
            `${BASE_URL}/researcher/researcher-1/researcher-ids`,
            {
                method: 'PUT',
                body: { researcherId: 'A-1234-2024' },
            },
        )
    })
})
