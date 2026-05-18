import {
    mockDynamicModalStore,
    mockNextRouter,
    mockReactIntlShorthand,
    mockSonner,
    mockUsePermission,
} from '../common'

describe('mockUsePermission', () => {
    it('defaults to true', () => {
        const mod = mockUsePermission()
        expect(mod.default()).toBe(true)
        expect(mod.usePermission()).toBe(true)
    })

    it('respects custom value', () => {
        const mod = mockUsePermission(false)
        expect(mod.default()).toBe(false)
        expect(mod.usePermission()).toBe(false)
    })
})

describe('mockDynamicModalStore', () => {
    it('exposes openModal/closeModal/closeAllModals via __modalHandles', () => {
        const mod = mockDynamicModalStore()
        expect(mod.__modalHandles.openModal).toBeDefined()
        expect(mod.__modalHandles.closeModal).toBeDefined()
        expect(mod.__modalHandles.closeAllModals).toBeDefined()
    })

    it('useDynamicModalStore returns same handles every call', () => {
        const mod = mockDynamicModalStore()
        const first = mod.useDynamicModalStore()
        const second = mod.useDynamicModalStore()
        expect(first.openModal).toBe(second.openModal)
    })

    it('openModal returns "modal-id"', () => {
        const mod = mockDynamicModalStore()
        const id = mod.useDynamicModalStore().openModal('dialog', {} as any)
        expect(id).toBe('modal-id')
    })
})

describe('mockSonner', () => {
    it('exposes promise/success/error/info/warning toast spies', () => {
        const mod = mockSonner()
        expect(jest.isMockFunction(mod.toast.promise)).toBe(true)
        expect(jest.isMockFunction(mod.toast.success)).toBe(true)
        expect(jest.isMockFunction(mod.toast.error)).toBe(true)
        expect(jest.isMockFunction(mod.toast.info)).toBe(true)
        expect(jest.isMockFunction(mod.toast.warning)).toBe(true)
    })
})

describe('mockReactIntlShorthand', () => {
    it('useIntl().formatMessage returns id verbatim', () => {
        const mod = mockReactIntlShorthand()
        expect(mod.useIntl().formatMessage({ id: 'foo.bar' })).toBe('foo.bar')
    })

    it('FormattedMessage returns id verbatim, IntlProvider passes through children', () => {
        const mod = mockReactIntlShorthand()
        expect(mod.FormattedMessage({ id: 'a.b' })).toBe('a.b')
        expect(mod.IntlProvider({ children: 'x' as any })).toBe('x')
    })
})

describe('mockNextRouter', () => {
    it('returns default router with query={} and / paths', () => {
        const mod = mockNextRouter()
        const r = mod.useRouter()
        expect(r.query).toEqual({})
        expect(r.pathname).toBe('/')
        expect(r.asPath).toBe('/')
    })

    it('overrides merge into router', () => {
        const mod = mockNextRouter({ pathname: '/abs', query: { uid: '1' } })
        const r = mod.useRouter()
        expect(r.pathname).toBe('/abs')
        expect(r.query).toEqual({ uid: '1' })
    })
})
