import { act } from '@testing-library/react'

import { fetchRequestDetailed } from '@/core/http/fetchClient'
import { renderHookWithQuery } from '@/testutils/wrappers/renderWithProviders'
import { BASE_URL } from '@/types/constants/common'

import { type PublicationWosPreviewResponse, WOS_PREVIEW_STATUS } from '../../types/wos-import'
import { usePublicationWosPreview } from '../usePublicationWosPreview'

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequestDetailed: jest.fn(),
}))

const mockFetchRequestDetailed = fetchRequestDetailed as jest.MockedFunction<
    typeof fetchRequestDetailed
>

beforeEach(() => {
    jest.clearAllMocks()
})

describe('usePublicationWosPreview', () => {
    it.each([
        {
            currentPublicationUid: 'publication-1',
            querySuffix: '&currentPublicationUid=publication-1',
        },
        { currentPublicationUid: undefined, querySuffix: '' },
    ])(
        'requests a preview for publication $currentPublicationUid',
        async ({ currentPublicationUid, querySuffix }) => {
            const response: PublicationWosPreviewResponse = {
                status: WOS_PREVIEW_STATUS.FOUND,
                doi: '10.1234/laser.test',
                values: { title: 'A paper' },
                authors: [],
                missingImportableFields: [],
                unavailableFields: ['abstract'],
            }
            mockFetchRequestDetailed.mockResolvedValue({
                data: response,
                status: 200,
                statusText: 'OK',
                headers: {},
            })
            const { result } = renderHookWithQuery(() => usePublicationWosPreview())

            await act(async () => {
                const request = {
                    doi: '10.1234/laser.test',
                    currentPublicationUid,
                }
                expect(await result.current.fetchPreview(request)).toEqual(response)
                expect(await result.current.fetchPreview(request)).toEqual(response)
            })

            expect(mockFetchRequestDetailed).toHaveBeenCalledTimes(2)
            expect(mockFetchRequestDetailed).toHaveBeenCalledWith(
                `${BASE_URL}/publications/wos-preview?doi=10.1234%2Flaser.test${querySuffix}`,
                expect.objectContaining({
                    method: 'GET',
                    body: undefined,
                    timeoutMs: 30_000,
                }),
            )
        },
    )

    it('preserves client timeout errors', async () => {
        const error = new DOMException('The request was aborted', 'AbortError')
        mockFetchRequestDetailed.mockRejectedValue(error)
        const { result } = renderHookWithQuery(() => usePublicationWosPreview())

        await act(async () => {
            await expect(result.current.fetchPreview({ doi: '10.1234/laser.test' })).rejects.toBe(
                error,
            )
        })
    })
})
