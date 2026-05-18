import {
    ELI_PUBLICATION,
    isMediaTypeC,
    isMediaTypeCOrD,
    isMediaTypeD,
    isPeerReviewedMediaType,
    MEDIA_TYPE_CODE,
    MEDIA_TYPE_CODEBOOK_CODE,
    MEDIA_TYPE_LABEL,
    MEDIA_TYPE_MAP,
    MEDIA_TYPE_UID,
    mediaTypeOptions,
} from '../constants'

describe('isPeerReviewedMediaType', () => {
    it('true when code matches MEDIA_TYPE_CODEBOOK_CODE', () => {
        expect(isPeerReviewedMediaType({ code: MEDIA_TYPE_CODEBOOK_CODE })).toBe(true)
    })

    it('true when name starts with codebook prefix', () => {
        expect(isPeerReviewedMediaType({ name: `${MEDIA_TYPE_CODEBOOK_CODE} Article` })).toBe(true)
    })

    it('false when neither matches', () => {
        expect(isPeerReviewedMediaType({ code: 'X', name: 'Other' })).toBe(false)
    })

    it('falsy on null', () => {
        expect(isPeerReviewedMediaType(null)).toBeFalsy()
    })
})

describe('mediaTypeOptions', () => {
    it('exposes two enabled options with matching labels', () => {
        expect(mediaTypeOptions).toEqual([
            {
                label: MEDIA_TYPE_LABEL.PEER_REVIEWED,
                value: MEDIA_TYPE_CODE.PeerReviewedArticle,
                disabled: false,
            },
            {
                label: MEDIA_TYPE_LABEL.OTHER,
                value: MEDIA_TYPE_CODE.OtherArticle,
                disabled: false,
            },
        ])
    })
})

describe('MEDIA_TYPE_MAP', () => {
    it('maps codes to labels', () => {
        expect(MEDIA_TYPE_MAP[MEDIA_TYPE_CODE.PeerReviewedArticle]).toBe(
            MEDIA_TYPE_LABEL.PEER_REVIEWED,
        )
        expect(MEDIA_TYPE_MAP[MEDIA_TYPE_CODE.OtherArticle]).toBe(MEDIA_TYPE_LABEL.OTHER)
    })
})

describe('ELI_PUBLICATION', () => {
    it('exposes YES/NO string values', () => {
        expect(ELI_PUBLICATION.YES).toBe('YES')
        expect(ELI_PUBLICATION.NO).toBe('NO')
    })
})

describe('isMediaTypeC / D / CorD', () => {
    it('true only for matching MEDIA_TYPE_UID', () => {
        expect(isMediaTypeC(MEDIA_TYPE_UID.BOOK_CHAPTER)).toBe(true)
        expect(isMediaTypeC(MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS)).toBe(false)
        expect(isMediaTypeD(MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS)).toBe(true)
        expect(isMediaTypeD(MEDIA_TYPE_UID.BOOK_CHAPTER)).toBe(false)
    })

    it('CorD is OR of C and D', () => {
        expect(isMediaTypeCOrD(MEDIA_TYPE_UID.BOOK_CHAPTER)).toBe(true)
        expect(isMediaTypeCOrD(MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS)).toBe(true)
        expect(isMediaTypeCOrD(MEDIA_TYPE_UID.PEER_REVIEWED_ARTICLE)).toBe(false)
        expect(isMediaTypeCOrD(undefined)).toBe(false)
    })
})
