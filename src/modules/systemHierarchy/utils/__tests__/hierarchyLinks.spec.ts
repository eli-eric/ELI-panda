import { PATH } from '@/types/constants/paths'

import { getSystemHierarchyDetailPath } from '../hierarchyLinks'

describe('getSystemHierarchyDetailPath', () => {
    it('builds a hierarchy detail deep link with the leaf param', () => {
        expect(getSystemHierarchyDetailPath('abc-123')).toBe(
            `${PATH.SYSTEMS_HIERARCHY}?leaf=abc-123`,
        )
    })

    it('encodes special characters in the uid', () => {
        const uid = 'test-123_ABC@xyz'
        expect(getSystemHierarchyDetailPath(uid)).toBe(
            `${PATH.SYSTEMS_HIERARCHY}?leaf=${encodeURIComponent(uid)}`,
        )
    })

    it('does not include tab or parent params', () => {
        const url = getSystemHierarchyDetailPath('u-1')
        expect(url).not.toContain('tab=')
        expect(url).not.toContain('parent=')
    })
})
