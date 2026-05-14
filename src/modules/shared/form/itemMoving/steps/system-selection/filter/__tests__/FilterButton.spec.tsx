import { fireEvent, render, screen } from '@testing-library/react'

import { useFormFilter, useFormFilterState } from '@/hooks/form/useFormFilters'

import { FilterButton } from '../FilterButton'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilter: jest.fn(),
    useFormFilterState: jest.fn(),
}))

jest.mock('@/components/Buttons', () => ({
    Button: ({
        children,
        onClick,
    }: {
        children: React.ReactNode
        onClick: () => void
    }) => (
        <button data-testid="btn" onClick={onClick}>
            {children}
        </button>
    ),
}))

let lastSlideOver: any = null
jest.mock('@/components/overlays/slideover/SlideOver', () => ({
    SlideOver: (props: any) => {
        lastSlideOver = props
        return props.open ? (
            <div data-testid="slideover">
                {props.RenderSettings}
                {props.children}
                <button data-testid="clear" onClick={props.buttons.goNext.onClick}>
                    Clear
                </button>
            </div>
        ) : null
    },
}))

jest.mock('@/modules/shared/filters/FilterSaveSettings', () => ({
    FilterSaveSettings: () => <div data-testid="filter-save" />,
}))

jest.mock('./FilterForm', () => ({ FilterForm: () => <div data-testid="ff" /> }), {
    virtual: true,
})

jest.mock('../FilterForm', () => ({
    FilterForm: () => <div data-testid="filter-form" />,
}))

jest.mock('@/components/form/Form', () => ({
    Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const mockUseFormFilter = useFormFilter as jest.Mock
const mockUseFormFilterState = useFormFilterState as jest.Mock

let reset: jest.Mock
let setColumnFilters: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    reset = jest.fn()
    setColumnFilters = jest.fn()
    mockUseFormFilter.mockReturnValue({ reset })
    mockUseFormFilterState.mockReturnValue({ storeFilters: [], setColumnFilters })
    lastSlideOver = null
})

describe('FilterButton', () => {
    it('renders trigger button + opens slideover on click', () => {
        render(<FilterButton tableId="t1" />)
        expect(screen.queryByTestId('slideover')).toBeNull()
        fireEvent.click(screen.getByTestId('btn'))
        expect(screen.getByTestId('slideover')).toBeInTheDocument()
    })

    it('Clear button resets form + clears column filters', () => {
        render(<FilterButton tableId="t1" />)
        fireEvent.click(screen.getByTestId('btn'))
        fireEvent.click(screen.getByTestId('clear'))
        expect(reset).toHaveBeenCalled()
        expect(setColumnFilters).toHaveBeenCalledWith([])
    })

    it('renders FilterSaveSettings in slideover settings slot', () => {
        render(<FilterButton tableId="t1" />)
        fireEvent.click(screen.getByTestId('btn'))
        expect(screen.getByTestId('filter-save')).toBeInTheDocument()
    })

    it('passes panelSlide through to SlideOver', () => {
        render(<FilterButton tableId="t1" panelSlide="right" />)
        fireEvent.click(screen.getByTestId('btn'))
        expect(lastSlideOver.panelSlide).toBe('right')
    })

    it('uses default tableId when not specified', () => {
        render(<FilterButton />)
        expect(mockUseFormFilter).toHaveBeenCalledWith(
            expect.objectContaining({ tableId: 'destionation-systems' }),
        )
    })
})
