import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemDetail } from '../../../hooks/useSystemDetail'
import { SetMinimalSparesButton } from '../SetMinimalSparesButton'

jest.mock('../../../hooks/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: {
        getState: jest.fn(),
    },
}))

const mockUseSystemDetail = useSystemDetail as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mod-1')
    ;(useDynamicModalStore as any).getState.mockReturnValue({ openModal })
    mockUseSystemDetail.mockReturnValue({
        systemDetail: { uid: 's-1', minimalSpareParstCount: 5 },
    })
})

describe('SetMinimalSparesButton', () => {
    it('renders Set button', () => {
        renderWithProviders(<SetMinimalSparesButton />, { withForm: true })
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens dialog with id "set-minimal-spares-<uid>" + m size', () => {
        renderWithProviders(<SetMinimalSparesButton />, { withForm: true })
        fireEvent.click(screen.getByRole('button'))
        const [kind, opts] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(opts.id).toBe('set-minimal-spares-s-1')
        expect(opts.props.size).toBe('m')
    })

    it('handles missing systemDetail gracefully', () => {
        mockUseSystemDetail.mockReturnValue({ systemDetail: undefined })
        renderWithProviders(<SetMinimalSparesButton />, { withForm: true })
        fireEvent.click(screen.getByRole('button'))
        const opts = openModal.mock.calls[0][1]
        expect(opts.id).toBe('set-minimal-spares-undefined')
    })
})
