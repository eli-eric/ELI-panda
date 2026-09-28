import { publicationPeerReviewedSchema } from '../../../form/scheme'
import { WOS_IMPORTABLE_FIELDS } from '../wos-preview.types'

describe('WOS_IMPORTABLE_FIELDS contract', () => {
    it.each(WOS_IMPORTABLE_FIELDS)('%s is a field of the publication form schema', field => {
        expect(Object.keys(publicationPeerReviewedSchema.shape)).toContain(field)
    })

    it('lists every importable field exactly once', () => {
        expect(new Set(WOS_IMPORTABLE_FIELDS).size).toBe(WOS_IMPORTABLE_FIELDS.length)
    })
})
