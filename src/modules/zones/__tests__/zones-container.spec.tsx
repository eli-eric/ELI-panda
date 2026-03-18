import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import type { ZonesResponse } from '../types/zone.types'

const mockZonesResponse: ZonesResponse = {
    data: [
        { uid: '1', name: 'Root Zone', code: 'RZ', parentZone: null },
        {
            uid: '2',
            name: 'Child Zone',
            code: 'CZ',
            parentZone: { uid: '1', name: 'Root Zone' },
        },
    ],
    totalCount: 2,
}

const mockRefetch = jest.fn()
const mockOpenZoneForm = jest.fn()

jest.mock('../hooks/useZones', () => ({
    useZones: () => ({
        data: mockZonesResponse,
        refetch: mockRefetch,
        isLoading: false,
    }),
}))

jest.mock('../hooks/useOpenZoneForm', () => ({
    useOpenZoneForm: () => ({
        openZoneForm: mockOpenZoneForm,
    }),
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: () => true,
    usePermission: () => true,
}))

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: (role: string) => () => role === ROLE.ZONES_EDIT,
}))

jest.mock('sonner', () => ({
    toast: { promise: jest.fn(), error: jest.fn(), success: jest.fn() },
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({
        openModal: jest.fn(),
        closeModal: jest.fn(),
    }),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: () => jest.fn(cb => () => cb()),
}))

jest.mock('../hooks/useZoneDelete', () => ({
    useZoneDelete: () => jest.fn(),
}))

jest.mock('../hooks/useZoneImport', () => ({
    useZoneImport: () => ({
        mutateAsync: jest.fn(),
        isPending: false,
    }),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: () => ({ query: '' }),
}))

jest.mock('next-usequerystate', () => ({
    useQueryState: () => [null, jest.fn()],
}))

// Mock PandaTableV2 to avoid react-dnd ESM issues
jest.mock('../../shared/table/pandaTableV2/PandaTableV2', () => ({
    PandaTableV2: ({ data }: { data?: any[] }) => (
        <div data-testid="panda-table" data-rows={data?.length ?? 0} />
    ),
}))

jest.mock('../../shared/table/PaginationV2', () => ({
    PaginationV2: () => <div data-testid="pagination" />,
}))

jest.mock('../../shared/table/pandaTable/hooks/usePandaTable', () => ({
    usePandaTable: () => ({}),
}))

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
})

const renderContainer = () => {
    const { ZonesContainer } = require('../zones.cont') // eslint-disable-line @typescript-eslint/no-require-imports

    return render(
        <IntlProvider locale="en" messages={messages.en}>
            <QueryClientProvider client={queryClient}>
                <ZonesContainer />
            </QueryClientProvider>
        </IntlProvider>,
    )
}

describe('ZonesContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders without crashing', () => {
        renderContainer()
    })

    it('renders search bar', () => {
        renderContainer()
        const searchInput = document.querySelector('input[type="search"]')
        expect(searchInput).toBeInTheDocument()
    })

    it('renders table with data', () => {
        renderContainer()
        expect(screen.getByTestId('panda-table')).toHaveAttribute('data-rows', '2')
    })

    it('renders pagination', () => {
        renderContainer()
        expect(screen.getByTestId('pagination')).toBeInTheDocument()
    })
})
