import { act } from '@testing-library/react'

import { fetchRequest } from '@/core/http/fetchClient'
import { renderHookWithQuery } from '@/testutils/wrappers/renderWithProviders'
import { BASE_URL } from '@/types/constants/common'

import type { PublicationWosPreviewResponse } from '../../types/wos-import'
import { usePublicationWosPreview } from '../usePublicationWosPreview'

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequest: jest.fn(),
}))

const mockFetchRequest = fetchRequest as jest.MockedFunction<typeof fetchRequest>

describe('usePublicationWosPreview', () => {
    it('requests a normalized preview with DOI and current publication UID query parameters', async () => {
        const response: PublicationWosPreviewResponse = {
            status: 'found',
            doi: '10.1234/laser.test',
            values: { title: 'A paper' },
            authors: [],
            missingImportableFields: [],
            unavailableFields: ['abstract'],
        }
        mockFetchRequest.mockResolvedValue(response)
        const { result } = renderHookWithQuery(() => usePublicationWosPreview())

        await act(async () => {
            await result.current.fetchPreview({
                doi: '10.1234/laser.test',
                currentPublicationUid: 'publication-1',
            })
        })

        expect(mockFetchRequest).toHaveBeenCalledWith(
            `${BASE_URL}/publications/wos-preview?doi=10.1234%2Flaser.test&currentPublicationUid=publication-1`,
        )
    })
})
