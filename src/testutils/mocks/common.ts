/**
 * Common jest.mock factory builders.
 * Usage (declare inside each test file):
 *
 *   jest.mock('@/hooks/usePermission', () => mockUsePermission())
 *   jest.mock('@/store/useDynamicModalStore', () => mockDynamicModalStore())
 *
 * Individual test may override by passing args or by re-mocking with jest.mock.
 */

export const mockUsePermission = (value = true) => ({
    __esModule: true,
    default: () => value,
    usePermission: () => value,
})

export const mockDynamicModalStore = () => {
    const openModal = jest.fn().mockReturnValue('modal-id')
    const closeModal = jest.fn()
    const closeAllModals = jest.fn()
    return {
        __esModule: true,
        useDynamicModalStore: () => ({ openModal, closeModal, closeAllModals }),
        // exposed for assertions
        __modalHandles: { openModal, closeModal, closeAllModals },
    }
}

export const mockSonner = () => ({
    __esModule: true,
    toast: {
        promise: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        warning: jest.fn(),
    },
})

export const mockReactIntlShorthand = () => ({
    __esModule: true,
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }) => id,
        formatNumber: (n: number) => String(n),
        formatDate: (d: unknown) => String(d),
    }),
    FormattedMessage: ({ id }: { id: string }) => id,
    IntlProvider: ({ children }: { children: React.ReactNode }) => children,
})

export const mockNextRouter = (overrides: Record<string, unknown> = {}) => ({
    __esModule: true,
    useRouter: () => ({
        query: {},
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        pathname: '/',
        asPath: '/',
        ...overrides,
    }),
})
