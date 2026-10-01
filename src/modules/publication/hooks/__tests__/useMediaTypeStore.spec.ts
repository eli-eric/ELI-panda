import { act } from '@testing-library/react'

import { MEDIA_TYPE_CODE } from '../../types/constants'
import { useMediaTypeStore } from '../useMediaTypeStore'

const reset = () =>
    act(() =>
        useMediaTypeStore.setState({
            mediaType: MEDIA_TYPE_CODE.PeerReviewedArticle,
            mediaTypeUid: undefined,
        }),
    )

describe('useMediaTypeStore', () => {
    beforeEach(reset)

    it('defaults to PeerReviewedArticle media type and undefined uid', () => {
        const s = useMediaTypeStore.getState()
        expect(s.mediaType).toBe(MEDIA_TYPE_CODE.PeerReviewedArticle)
        expect(s.mediaTypeUid).toBeUndefined()
    })

    it('setMediaType updates the type', () => {
        act(() => useMediaTypeStore.getState().setMediaType(MEDIA_TYPE_CODE.OtherArticle))
        expect(useMediaTypeStore.getState().mediaType).toBe(MEDIA_TYPE_CODE.OtherArticle)
    })

    it('setMediaTypeUid stores + clears via undefined', () => {
        act(() => useMediaTypeStore.getState().setMediaTypeUid('uid-1'))
        expect(useMediaTypeStore.getState().mediaTypeUid).toBe('uid-1')
        act(() => useMediaTypeStore.getState().setMediaTypeUid(undefined))
        expect(useMediaTypeStore.getState().mediaTypeUid).toBeUndefined()
    })
})
