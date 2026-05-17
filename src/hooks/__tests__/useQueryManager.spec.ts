import { renderHook } from '@testing-library/react'

import useTableStateStore from '@/store/useTableStateStore'
import useQueryManager from '@/hooks/useQueryManager'

let querySearch: string | null = null
let queryCategory: string | null = null
let queryFilter: string | null = null
let queryPage: string | null = null
let queryPageSize: string | null = null

jest.mock('next-usequerystate', () => ({
    useQueryState: (key: string) => {
        switch (key) {
            case 'category':
                return [queryCategory, jest.fn()]
            case 'search':
                return [querySearch, jest.fn()]
            case 'filter':
                return [queryFilter, jest.fn()]
            case 'page':
                return [queryPage, jest.fn()]
            case 'pageSize':
                return [queryPageSize, jest.fn()]
        }
        return [null, jest.fn()]
    },
}))

jest.mock('@/store/useTableStateStore', () => {
    const fn: any = jest.fn()
    return { __esModule: true, default: fn }
})

const mockUseTableStateStore = useTableStateStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    querySearch = null
    queryCategory = null
    queryFilter = null
    queryPage = null
    queryPageSize = null
})

const setStore = (instance: any = {}) => {
    mockUseTableStateStore.mockReturnValue({ instances: { t1: instance } })
}

describe('useQueryManager', () => {
    it('default pagination uses URL or defaults', () => {
        setStore({})
        const { result } = renderHook(() => useQueryManager('t1'))
        const pag = JSON.parse(result.current.query.pagination!)
        expect(pag.page).toBeGreaterThanOrEqual(1)
        expect(pag.pageSize).toBeGreaterThan(0)
    })

    it('store pagination wins over URL', () => {
        setStore({ pagination: '{"page":5,"pageSize":20}' })
        queryPage = '99'
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(result.current.query.pagination).toBe('{"page":5,"pageSize":20}')
    })

    it('paginationState (typed) wins over legacy pagination', () => {
        setStore({
            paginationState: { page: 3, pageSize: 50 },
            pagination: '{"page":7,"pageSize":10}',
        })
        const { result } = renderHook(() => useQueryManager('t1'))
        const pag = JSON.parse(result.current.query.pagination!)
        expect(pag.page).toBe(3)
        expect(pag.pageSize).toBe(50)
    })

    it('search reads from store, then URL fallback', () => {
        setStore({ search: 'from-store' })
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(result.current.query.search).toBe('from-store')
    })

    it('search falls back to URL when store empty', () => {
        querySearch = 'from-url'
        setStore({})
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(result.current.query.search).toBe('from-url')
    })

    it('columnFilter uses store filters when present', () => {
        setStore({ columnFilter: [{ id: 'a', value: 'x' }] })
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(JSON.parse(result.current.query.columnFilter!)).toEqual([
            { id: 'a', value: 'x' },
        ])
    })

    it('columnFilter falls back to URL filter only when enableQueryURL=true and store is empty', () => {
        queryFilter = JSON.stringify([{ id: 'b', value: 'y' }])
        setStore({})
        const { result } = renderHook(() => useQueryManager('t1', undefined, true))
        expect(JSON.parse(result.current.query.columnFilter!)).toEqual([
            { id: 'b', value: 'y' },
        ])
    })

    it('columnFilter ignores URL when enableQueryURL=false', () => {
        queryFilter = JSON.stringify([{ id: 'b', value: 'y' }])
        setStore({})
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(JSON.parse(result.current.query.columnFilter!)).toEqual([])
    })

    it('category from URL is merged as an additional filter', () => {
        queryCategory = JSON.stringify({ uid: 'cat-1', name: 'Cat' })
        setStore({})
        const { result } = renderHook(() => useQueryManager('t1'))
        const filters = JSON.parse(result.current.query.columnFilter!)
        expect(filters.length).toBeGreaterThan(0)
        const cat = filters.find((f: any) => f.id === 'category')
        expect(cat?.value).toEqual({ uid: 'cat-1', name: 'Cat' })
    })

    it('sorting flows through from store.sortByQueryString', () => {
        setStore({ sortByQueryString: 'name asc' })
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(result.current.query.sorting).toBe('name asc')
    })

    it('custom store fields are spread into query', () => {
        setStore({ custom: { extra: 1, more: 'x' } })
        const { result } = renderHook(() => useQueryManager('t1'))
        expect(result.current.query.extra).toBe(1)
        expect(result.current.query.more).toBe('x')
    })
})
