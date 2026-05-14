import { fireEvent, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ZoneImportButton } from '../components/zone-import.comp'
import { useZoneImport } from '../hooks/useZoneImport'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('../hooks/useZoneImport', () => ({
    useZoneImport: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseZoneImport = useZoneImport as jest.Mock

let mutateAsync: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mutateAsync = jest.fn().mockResolvedValue({ created: 1, skipped: 0, errors: [] })
    mockUseZoneImport.mockReturnValue({ mutateAsync, isPending: false })
    mockUseAccessControl.mockReturnValue(() => true)
})

describe('ZoneImportButton', () => {
    it('returns null when user lacks ZONES_EDIT', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        const { container } = renderWithProviders(<ZoneImportButton />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders icon button when canEdit', () => {
        renderWithProviders(<ZoneImportButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('button disabled while isPending', () => {
        mockUseZoneImport.mockReturnValue({ mutateAsync, isPending: true })
        renderWithProviders(<ZoneImportButton />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('file input change triggers mutateAsync with the file', () => {
        const { container } = renderWithProviders(<ZoneImportButton />)
        const input = container.querySelector('input[type="file"]') as HTMLInputElement
        const file = new File(['a,b\n1,2'], 'zones.csv', { type: 'text/csv' })
        fireEvent.change(input, { target: { files: [file] } })
        expect(mutateAsync).toHaveBeenCalledWith(file)
    })

    it('no-op when no file selected', () => {
        const { container } = renderWithProviders(<ZoneImportButton />)
        const input = container.querySelector('input[type="file"]') as HTMLInputElement
        fireEvent.change(input, { target: { files: [] } })
        expect(mutateAsync).not.toHaveBeenCalled()
    })
})
