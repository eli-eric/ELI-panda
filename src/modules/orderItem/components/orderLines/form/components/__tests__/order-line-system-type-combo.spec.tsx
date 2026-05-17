import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useEmptySystemSelectionModal } from '../../hooks/useEmptySystemSelectionModal'
import { OrderLineSystemTypeCombo } from '../order-line-system-type-combo'

jest.mock('../../hooks/useEmptySystemSelectionModal', () => ({
    useEmptySystemSelectionModal: jest.fn(),
}))

let lastSelectProps: any = null
jest.mock('@/components/ui/select', () => ({
    Select: (p: any) => {
        lastSelectProps = p
        return <div data-testid="select" data-value={p.value} data-disabled={p.disabled} />
    },
    SelectContent: ({ children }: any) => <>{children}</>,
    SelectTrigger: ({ children }: any) => <>{children}</>,
    SelectValue: () => null,
    SelectItem: () => null,
}))

const mockUseEmptySystemSelectionModal = useEmptySystemSelectionModal as jest.Mock

let openEmptySystemModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastSelectProps = null
    openEmptySystemModal = jest.fn()
    mockUseEmptySystemSelectionModal.mockReturnValue({ openEmptySystemModal })
})

describe('OrderLineSystemTypeCombo', () => {
    it('renders Select with current value + disabled', () => {
        renderWithProviders(<OrderLineSystemTypeCombo value="new" onChange={jest.fn()} disabled />)
        const sel = lastSelectProps
        expect(sel.value).toBe('new')
        expect(sel.disabled).toBe(true)
    })

    it('change to "new" invokes onChange("new")', () => {
        const onChange = jest.fn()
        renderWithProviders(<OrderLineSystemTypeCombo value="new" onChange={onChange} />)
        lastSelectProps.onValueChange('new')
        expect(onChange).toHaveBeenCalledWith('new')
        expect(openEmptySystemModal).not.toHaveBeenCalled()
    })

    it('change to "existing" opens system modal; selection callback invokes onChange with system+parent', () => {
        const onChange = jest.fn()
        renderWithProviders(<OrderLineSystemTypeCombo value="new" onChange={onChange} />)
        lastSelectProps.onValueChange('existing')
        expect(openEmptySystemModal).toHaveBeenCalledTimes(1)
        const modalCb = openEmptySystemModal.mock.calls[0][0]
        modalCb({ uid: 's', name: 'S' }, { uid: 'p', name: 'P' })
        expect(onChange).toHaveBeenCalledWith(
            'existing',
            { uid: 's', name: 'S' },
            { uid: 'p', name: 'P' },
        )
    })

    it('modal callback no-op when system is null', () => {
        const onChange = jest.fn()
        renderWithProviders(<OrderLineSystemTypeCombo value="new" onChange={onChange} />)
        lastSelectProps.onValueChange('existing')
        const modalCb = openEmptySystemModal.mock.calls[0][0]
        modalCb(null)
        expect(onChange).not.toHaveBeenCalled()
    })

    it('modal callback handles undefined parent', () => {
        const onChange = jest.fn()
        renderWithProviders(<OrderLineSystemTypeCombo value="new" onChange={onChange} />)
        lastSelectProps.onValueChange('existing')
        const modalCb = openEmptySystemModal.mock.calls[0][0]
        modalCb({ uid: 's', name: 'S' })
        expect(onChange).toHaveBeenCalledWith('existing', { uid: 's', name: 'S' }, undefined)
    })
})
