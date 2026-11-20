import { isPreviewCurrent } from '../previewParams'

const previewed = { zoneUid: 'zone-1', systemTypeUid: 'type-1', batch: 3 }
const selection = { zoneUid: 'zone-1', systemTypeUid: 'type-1', batch: 3 }

describe('isPreviewCurrent', () => {
    it('true when the selection is exactly what was previewed', () => {
        expect(isPreviewCurrent(previewed, selection)).toBe(true)
    })

    it.each([
        ['zone', { ...selection, zoneUid: 'zone-2' }],
        ['system type', { ...selection, systemTypeUid: 'type-2' }],
        ['batch', { ...selection, batch: 4 }],
    ])('false while the %s is ahead of the preview', (_label, changed) => {
        expect(isPreviewCurrent(previewed, changed)).toBe(false)
    })

    it.each([
        ['zone', { ...selection, zoneUid: undefined }],
        ['system type', { ...selection, systemTypeUid: undefined }],
    ])('false when the %s has been cleared', (_label, cleared) => {
        expect(isPreviewCurrent(previewed, cleared)).toBe(false)
    })

    it('false when there is no preview at all', () => {
        // Post-create the container drops the preview; Create must not stay enabled.
        expect(isPreviewCurrent(null, selection)).toBe(false)
        expect(isPreviewCurrent(undefined, selection)).toBe(false)
    })
})
