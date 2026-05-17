import { fireEvent, screen } from '@testing-library/react'

import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { FilterBadges } from '../FilterBadges'

jest.mock('@/modules/shared/table/pandaTable/hooks/useFilters', () => ({
    useFilters: jest.fn(),
}))

jest.mock('@/store/useFormControlStore', () => ({
    useFormControlStore: jest.fn(),
}))

const mockUseFilters = useFilters as jest.Mock
const mockUseFormControlStore = useFormControlStore as unknown as jest.Mock

let setFilters: jest.Mock
let addFieldIdToSync: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setFilters = jest.fn()
    addFieldIdToSync = jest.fn()
    mockUseFormControlStore.mockReturnValue({ addFieldIdToSync })
})

describe('FilterBadges', () => {
    it('renders nothing visible when no filters and no additional badge', () => {
        mockUseFilters.mockReturnValue([[], setFilters])
        const { container } = renderWithProviders(<FilterBadges tableId="t1" />)
        expect(container.textContent).toBe('')
    })

    it('renders heading + one badge per filter', () => {
        mockUseFilters.mockReturnValue([
            [
                { id: 'a', name: 'Alpha' },
                { id: 'b', name: 'Beta' },
            ],
            setFilters,
        ])
        renderWithProviders(<FilterBadges tableId="t1" />)
        expect(screen.getByText('Alpha')).toBeInTheDocument()
        expect(screen.getByText('Beta')).toBeInTheDocument()
    })

    it('clicking X removes that filter and registers field for sync', () => {
        mockUseFilters.mockReturnValue([
            [
                { id: 'a', name: 'Alpha' },
                { id: 'b', name: 'Beta' },
            ],
            setFilters,
        ])
        const { container } = renderWithProviders(<FilterBadges tableId="t1" />)
        const xs = container.querySelectorAll('.clickable')
        fireEvent.click(xs[0])
        expect(setFilters).toHaveBeenCalledWith([{ id: 'b', name: 'Beta' }])
        expect(addFieldIdToSync).toHaveBeenCalledWith('a')
    })

    it('renders heading even with only an additionalBadge', () => {
        mockUseFilters.mockReturnValue([[], setFilters])
        renderWithProviders(
            <FilterBadges tableId="t1" additionalBadge={<span>extra</span>} />,
        )
        expect(screen.getByText('extra')).toBeInTheDocument()
    })

    it('passes enableQueryURL through to useFilters', () => {
        mockUseFilters.mockReturnValue([[], setFilters])
        renderWithProviders(<FilterBadges tableId="zones" enableQueryURL={false} />)
        expect(mockUseFilters).toHaveBeenCalledWith('zones', false, false)
    })
})
