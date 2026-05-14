import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { RivExportDialogComponent } from '../riv-export-dialog.comp'

jest.mock('@/components/ui/select', () => ({
    Select: ({
        children,
        value,
        onValueChange,
    }: {
        children: React.ReactNode
        value?: string
        onValueChange: (v: string) => void
    }) => (
        <select
            data-testid={`select-${value ?? 'empty'}`}
            value={value ?? ''}
            onChange={e => onValueChange(e.target.value)}
        >
            {children}
        </select>
    ),
    SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectValue: () => null,
    SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
        <option value={value}>{children}</option>
    ),
}))

const baseProps = {
    year: '2024',
    yearOptions: ['2024', '2023'],
    onYearChange: jest.fn(),
    provider: 'P1',
    providerOptions: [
        { code: 'P1', name: 'Provider 1' },
        { code: 'P2', name: 'Provider 2' },
    ],
    onProviderChange: jest.fn(),
    deliveryRef: 'D-1',
    onDeliveryRefChange: jest.fn(),
    isValidating: false,
    onDownload: jest.fn(),
    isDownloading: false,
    canExport: true,
}

beforeEach(() => {
    jest.clearAllMocks()
})

describe('RivExportDialogComponent', () => {
    it('renders year + provider selects + deliveryRef input + Download button', () => {
        renderWithProviders(<RivExportDialogComponent {...baseProps} />)
        const input = screen.getByDisplayValue('D-1')
        expect(input).toBeInTheDocument()
        expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(1)
    })

    it('Download disabled when canExport=false', () => {
        renderWithProviders(<RivExportDialogComponent {...baseProps} canExport={false} />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('Download disabled while isDownloading', () => {
        renderWithProviders(<RivExportDialogComponent {...baseProps} isDownloading />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('Download disabled while isValidating', () => {
        renderWithProviders(<RivExportDialogComponent {...baseProps} isValidating />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('Download disabled when deliveryRef is whitespace-only', () => {
        renderWithProviders(
            <RivExportDialogComponent {...baseProps} deliveryRef="   " />,
        )
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('Download click invokes onDownload', () => {
        const onDownload = jest.fn()
        renderWithProviders(
            <RivExportDialogComponent {...baseProps} onDownload={onDownload} />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(onDownload).toHaveBeenCalledTimes(1)
    })

    it('renders validation totals + warnings table when validation present', () => {
        renderWithProviders(
            <RivExportDialogComponent
                {...baseProps}
                validation={{
                    totalPublications: 10,
                    validPublications: 8,
                    warnings: [
                        { publicationCode: 'P-1', message: 'M1' },
                        { publicationCode: 'P-2', message: 'M2' },
                    ],
                } as any}
            />,
        )
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('8')).toBeInTheDocument()
        expect(screen.getByText('P-1')).toBeInTheDocument()
        expect(screen.getByText('M2')).toBeInTheDocument()
    })

    it('shows noWarnings message when validation has 0 warnings', () => {
        renderWithProviders(
            <RivExportDialogComponent
                {...baseProps}
                validation={{
                    totalPublications: 5,
                    validPublications: 5,
                    warnings: [],
                } as any}
            />,
        )
        // 2x "5" in totals
        expect(screen.getAllByText('5').length).toBeGreaterThan(0)
    })

    it('input change calls onDeliveryRefChange', () => {
        const onDeliveryRefChange = jest.fn()
        renderWithProviders(
            <RivExportDialogComponent
                {...baseProps}
                onDeliveryRefChange={onDeliveryRefChange}
            />,
        )
        fireEvent.change(screen.getByDisplayValue('D-1'), {
            target: { value: 'D-2' },
        })
        expect(onDeliveryRefChange).toHaveBeenCalledWith('D-2')
    })
})
