import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useCatalogueItems } from '../../hooks/useCatalogueItems'
import { useCategoryUid } from '../../hooks/useCategoryUid'
import { SearchBarButtons } from '../SearchBarButtons'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/modules/catalogueItem/components/statistics/CatalogueStatistics.button', () => ({
    ModalStatisticsButtonLarge: () => <div data-testid="stats" />,
}))

jest.mock('@/modules/shared/table/SearchBar', () => ({
    SearchBarButtonsComponent: ({
        handleAdd,
        handleRefresh,
        editRole,
        children,
    }: {
        handleAdd: () => void
        handleRefresh: () => void
        editRole: string
        children?: React.ReactNode
    }) => (
        <div data-testid="bar" data-role={editRole}>
            <button data-testid="add" onClick={handleAdd}>
                add
            </button>
            <button data-testid="refresh" onClick={handleRefresh}>
                refresh
            </button>
            {children}
        </div>
    ),
}))

jest.mock('../filters/CatalogueFilterButton.cont', () => ({
    CatalogueFilterButtonContainer: () => <div data-testid="filter-btn" />,
}))

jest.mock('../../hooks/useCatalogueItems', () => ({
    useCatalogueItems: jest.fn(),
}))

jest.mock('../../hooks/useCategoryUid', () => ({
    useCategoryUid: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseCatalogueItems = useCatalogueItems as jest.Mock
const mockUseCategoryUid = useCategoryUid as jest.Mock

let push: jest.Mock
let refetch: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    push = jest.fn()
    refetch = jest.fn()
    mockUseRouter.mockReturnValue({ push })
    mockUseCatalogueItems.mockReturnValue({ refetch })
    mockUseCategoryUid.mockReturnValue(undefined)
})

describe('SearchBarButtons (catalogue)', () => {
    it('passes CATALOGUE_EDIT role + stats + filter button children', () => {
        render(<SearchBarButtons filterFormMethods={{} as any} />)
        expect(screen.getByTestId('bar').dataset.role).toBe('catalogue-edit')
        expect(screen.getByTestId('stats')).toBeInTheDocument()
        expect(screen.getByTestId('filter-btn')).toBeInTheDocument()
    })

    it('Refresh click invokes useCatalogueItems.refetch', () => {
        render(<SearchBarButtons filterFormMethods={{} as any} />)
        fireEvent.click(screen.getByTestId('refresh'))
        expect(refetch).toHaveBeenCalled()
    })

    it('Add click pushes to CATALOGUE_ITEM path without query when no uid', () => {
        render(<SearchBarButtons filterFormMethods={{} as any} />)
        fireEvent.click(screen.getByTestId('add'))
        const arg = push.mock.calls[0][0]
        expect(arg.pathname).toBeDefined()
        expect(arg.query).toBeUndefined()
    })

    it('Add click pushes with categoryUid query when uid exists', () => {
        mockUseCategoryUid.mockReturnValue('cat-1')
        render(<SearchBarButtons filterFormMethods={{} as any} />)
        fireEvent.click(screen.getByTestId('add'))
        const arg = push.mock.calls[0][0]
        expect(arg.query).toEqual({ categoryUid: 'cat-1' })
    })
})
