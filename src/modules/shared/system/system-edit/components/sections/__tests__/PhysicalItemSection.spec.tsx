import { render, screen } from '@testing-library/react'

import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'

import { PhysicalItemSection } from '../PhysicalItemSection.comp'

jest.mock('@/modules/systemItem/components/form/SystemForm.fields', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/components/form/inline-edit/InlineEditInput', () => ({
    InlineEditInput: ({ name }: { name: string }) => <div data-testid={`input-${name}`} />,
}))

jest.mock('@/components/form/inline-edit/InlineEditListbox', () => ({
    InlineEditListbox: ({ name }: { name: string }) => <div data-testid={`listbox-${name}`} />,
}))

jest.mock('@/components/form/inline-edit/InlineEditTextArea', () => ({
    InlineEditTextArea: ({ name }: { name: string }) => <div data-testid={`textarea-${name}`} />,
}))

jest.mock('@/components/ui', () => ({
    Disclosure: ({ children, title }: { children: React.ReactNode; title: string }) => (
        <section data-testid="disclosure" data-title={title}>
            {children}
        </section>
    ),
}))

jest.mock(
    '@/modules/shared/system/device-info-overlay/components/system-detail-parameter.comp',
    () => ({
        SystemDetailParameter: ({
            title,
            value,
            href,
        }: {
            title: string
            value: string
            href?: string
        }) => (
            <div data-testid={`param-${title}`} data-value={value} data-href={href ?? ''} />
        ),
    }),
)

const mockUseFields = useSystemEditFormFields as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFields.mockReturnValue({
        serialNumber: { name: 'serialNumber' },
        itemUsage: { name: 'itemUsage' },
        itemConditionStatus: { name: 'itemConditionStatus' },
        itemNotes: { name: 'itemNotes' },
    })
})

describe('PhysicalItemSection', () => {
    it('returns null when physicalItem is falsy', () => {
        const { container } = render(
            <PhysicalItemSection physicalItem={null} catalogueItem={null} />,
        )
        expect(container.firstChild).toBeNull()
    })

    it('renders inline edits when physicalItem is present', () => {
        render(<PhysicalItemSection physicalItem={{ eun: null }} catalogueItem={null} />)
        expect(screen.getByTestId('input-serialNumber')).toBeInTheDocument()
        expect(screen.getByTestId('listbox-itemUsage')).toBeInTheDocument()
        expect(screen.getByTestId('listbox-itemConditionStatus')).toBeInTheDocument()
        expect(screen.getByTestId('textarea-itemNotes')).toBeInTheDocument()
    })

    it('renders EUN read-only parameter when present', () => {
        render(
            <PhysicalItemSection physicalItem={{ eun: 'E-1' }} catalogueItem={null} />,
        )
        expect(screen.getByTestId('param-EUN').dataset.value).toBe('E-1')
    })

    it('renders Part Number with catalogue item link', () => {
        render(
            <PhysicalItemSection
                physicalItem={{ eun: null }}
                catalogueItem={{ uid: 'c-1', catalogueNumber: 'PN-1' }}
            />,
        )
        const param = screen.getByTestId('param-Part Number')
        expect(param.dataset.value).toBe('PN-1')
        expect(param.dataset.href).toContain('c-1')
    })

    it('renders Category + Supplier when present', () => {
        render(
            <PhysicalItemSection
                physicalItem={{ eun: null }}
                catalogueItem={{
                    uid: 'c-1',
                    catalogueCategory: { uid: 'cat-1', name: 'Cat-A' },
                    supplier: { name: 'Supp-A' },
                }}
            />,
        )
        expect(screen.getByTestId('param-Category').dataset.value).toBe('Cat-A')
        expect(screen.getByTestId('param-Supplier').dataset.value).toBe('Supp-A')
    })
})
