import { fireEvent, screen } from '@testing-library/react'

import { useCodebook } from '@/hooks/fetch/useCodebook'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { FilterCheckboxes } from '../FIlterCheckboxes'

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: jest.fn(),
}))

jest.mock('@/components/ui/checkbox', () => ({
    CheckboxWithLabel: ({
        id,
        checked,
        onChange,
        label,
    }: {
        id: string
        checked: boolean
        onChange: (c: boolean) => void
        label: string
    }) => (
        <label data-testid={`cb-${id}`} data-checked={String(checked)}>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange((e.target as HTMLInputElement).checked)}
            />
            {label}
        </label>
    ),
}))

const mockUseCodebook = useCodebook as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('FilterCheckboxes', () => {
    it('renders one checkbox per options entry', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        renderWithProviders(
            <FilterCheckboxes name="x" label="X" options={['A', 'B']} />,
            { withForm: true },
        )
        expect(screen.getByTestId('cb-A')).toBeInTheDocument()
        expect(screen.getByTestId('cb-B')).toBeInTheDocument()
    })

    it('renders one checkbox per codebookOptions entry', () => {
        mockUseCodebook.mockReturnValue({
            data: { data: [{ uid: 'u-1', name: 'N-1' }] },
        })
        renderWithProviders(<FilterCheckboxes name="x" label="X" />, {
            withForm: true,
        })
        expect(screen.getByTestId('cb-u-1')).toBeInTheDocument()
    })

    it('uses customCodebookOptions when supplied (skips useCodebook data)', () => {
        mockUseCodebook.mockReturnValue({
            data: { data: [{ uid: 'u-codebook', name: 'X' }] },
        })
        renderWithProviders(
            <FilterCheckboxes
                name="x"
                label="X"
                customCodebookOptions={[{ uid: 'c-custom', name: 'C' } as any]}
            />,
            { withForm: true },
        )
        expect(screen.getByTestId('cb-c-custom')).toBeInTheDocument()
        expect(screen.queryByTestId('cb-u-codebook')).toBeNull()
    })

    it('toggling option fires onChange with new array', () => {
        const onChange = jest.fn()
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        renderWithProviders(
            <FilterCheckboxes
                name="x"
                label="X"
                options={['A']}
                onChange={onChange}
            />,
            { withForm: true },
        )
        fireEvent.click(
            screen.getByTestId('cb-A').querySelector('input') as HTMLInputElement,
        )
        expect(onChange).toHaveBeenCalledWith(['A'])
    })
})
