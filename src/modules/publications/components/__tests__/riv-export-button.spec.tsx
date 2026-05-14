import { fireEvent, render, screen } from '@testing-library/react'

import { openModal } from '@/utils/modalHelpers'

import { RivExportButton } from '../riv-export.button'

jest.mock('@/utils/modalHelpers', () => ({
    openModal: jest.fn(),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('../riv-export-dialog.cont', () => ({
    RivExportDialogContainer: () => null,
}))

const mockOpenModal = openModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('RivExportButton', () => {
    it('renders a button', () => {
        render(<RivExportButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens RIV export dialog with title + l size + id', () => {
        render(<RivExportButton />)
        fireEvent.click(screen.getByRole('button'))
        const [component, props, options] = mockOpenModal.mock.calls[0]
        expect(component).toBeDefined()
        expect(props).toEqual({})
        expect(options).toEqual({
            title: 'Export to RIV',
            size: 'l',
            id: 'riv-export',
        })
    })
})
