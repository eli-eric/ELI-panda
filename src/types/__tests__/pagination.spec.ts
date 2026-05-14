import {
    calculateDisplayRange,
    calculateTotalPages,
    clampPage,
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGINATION,
    generatePageNumbers,
    getTablePageSizeDefault,
    PAGE_SIZE_OPTIONS,
    parseLegacyPagination,
    resolvePageSizeDefault,
    toLegacyPagination,
} from '../pagination'

describe('pagination constants', () => {
    it('PAGE_SIZE_OPTIONS contains the standard set + DEFAULT in set', () => {
        expect(PAGE_SIZE_OPTIONS).toEqual([10, 25, 50, 100])
        expect((PAGE_SIZE_OPTIONS as readonly number[]).includes(DEFAULT_PAGE_SIZE)).toBe(true)
    })

    it('DEFAULT_PAGINATION uses page=1 and default size', () => {
        expect(DEFAULT_PAGINATION).toEqual({ page: 1, pageSize: DEFAULT_PAGE_SIZE })
    })
})

describe('getTablePageSizeDefault', () => {
    it('returns custom default for known tableId', () => {
        expect(getTablePageSizeDefault('systemLeaves')).toBe(25)
        expect(getTablePageSizeDefault('publications')).toBe(100)
        expect(getTablePageSizeDefault('catalogueItemsModal')).toBe(10)
    })

    it('returns DEFAULT_PAGE_SIZE for unknown tableId', () => {
        expect(getTablePageSizeDefault('unknown')).toBe(DEFAULT_PAGE_SIZE)
    })
})

describe('resolvePageSizeDefault', () => {
    it('prefers explicit pageSizeDefault when in PAGE_SIZE_OPTIONS', () => {
        expect(resolvePageSizeDefault('systemLeaves', 100)).toBe(100)
    })

    it('falls back to table default when arg is not in PAGE_SIZE_OPTIONS', () => {
        expect(resolvePageSizeDefault('systemLeaves', 999)).toBe(25)
        expect(resolvePageSizeDefault('unknown', undefined)).toBe(DEFAULT_PAGE_SIZE)
    })
})

describe('parseLegacyPagination / toLegacyPagination', () => {
    it('round-trips a valid pagination object', () => {
        const state = { page: 2, pageSize: 25 }
        expect(parseLegacyPagination(toLegacyPagination(state))).toEqual(state)
    })

    it('returns defaults on invalid JSON', () => {
        expect(parseLegacyPagination('not-json')).toEqual(DEFAULT_PAGINATION)
    })

    it('coerces non-positive page/pageSize to defaults', () => {
        expect(
            parseLegacyPagination(JSON.stringify({ page: 0, pageSize: -1 })),
        ).toEqual(DEFAULT_PAGINATION)
    })

    it('uses provided defaults on missing input', () => {
        const defaults = { page: 5, pageSize: 100 }
        expect(parseLegacyPagination(undefined, defaults)).toBe(defaults)
    })
})

describe('clampPage', () => {
    it('clamps to [1, totalPages]', () => {
        expect(clampPage(0, 5)).toBe(1)
        expect(clampPage(10, 5)).toBe(5)
        expect(clampPage(3, 5)).toBe(3)
    })

    it('ensures at least 1 even when totalPages=0', () => {
        expect(clampPage(0, 0)).toBe(1)
    })
})

describe('calculateTotalPages', () => {
    it('rounds up; minimum of 1', () => {
        expect(calculateTotalPages(0, 25)).toBe(1)
        expect(calculateTotalPages(50, 25)).toBe(2)
        expect(calculateTotalPages(51, 25)).toBe(3)
    })
})

describe('calculateDisplayRange', () => {
    it('returns {0,0} for zero total', () => {
        expect(calculateDisplayRange(1, 25, 0)).toEqual({ from: 0, to: 0 })
    })

    it('computes range for typical page', () => {
        expect(calculateDisplayRange(2, 25, 100)).toEqual({ from: 26, to: 50 })
        expect(calculateDisplayRange(2, 25, 40)).toEqual({ from: 26, to: 40 })
    })
})

describe('generatePageNumbers', () => {
    it('returns [] for totalPages=0 and [1] for totalPages=1', () => {
        expect(generatePageNumbers(1, 0)).toEqual([])
        expect(generatePageNumbers(1, 1)).toEqual([1])
    })

    it('no ellipsis when range fits', () => {
        expect(generatePageNumbers(3, 5)).toEqual([1, 2, 3, 4, 5])
    })

    it('left ellipsis when current is near the end', () => {
        const out = generatePageNumbers(15, 15)
        expect(out[0]).toBe(1)
        expect(out).toContain('ellipsis')
        expect(out[out.length - 1]).toBe(15)
    })

    it('both ellipses for current in the middle of large range', () => {
        const out = generatePageNumbers(7, 15)
        expect(out[0]).toBe(1)
        expect(out[out.length - 1]).toBe(15)
        expect(out.filter(x => x === 'ellipsis')).toHaveLength(2)
    })
})
