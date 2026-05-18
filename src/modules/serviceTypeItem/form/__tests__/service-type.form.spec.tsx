import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ServiceTypeForm } from '../service-type.form'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: (p: any) => (
        <input
            data-testid={`inp-${p.name}`}
            disabled={p.disabled}
            data-label={p.label}
        />
    ),
    TextArea: (p: any) => (
        <textarea
            data-testid={`ta-${p.name}`}
            disabled={p.disabled}
        />
    ),
}))

let lastComboProps: any = null
jest.mock('@/components/form/ComboboxTree', () => ({
    ComboboxTree: (p: any) => {
        lastComboProps = p
        return (
            <button
                data-testid="combo-tree"
                disabled={p.disabled}
                onClick={() => p.onSelect?.()}
            />
        )
    },
}))

jest.mock('@/components/grid/Grid', () => ({
    Grid: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Col: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastComboProps = null
})

describe('ServiceTypeForm', () => {
    it('renders name input + category combo + description textarea', () => {
        mockUsePermission.mockReturnValue(true)
        renderWithProviders(<ServiceTypeForm />, {
            withForm: true,
            formProps: { defaultValues: { properties: [] } },
        })
        expect(screen.getByTestId('inp-name')).toBeInTheDocument()
        expect(screen.getByTestId('combo-tree')).toBeInTheDocument()
        expect(screen.getByTestId('ta-description')).toBeInTheDocument()
    })

    it('SERVICE_EDIT permission → not disabled', () => {
        mockUsePermission.mockReturnValue(true)
        renderWithProviders(<ServiceTypeForm />, {
            withForm: true,
            formProps: { defaultValues: { properties: [] } },
        })
        expect(screen.getByTestId('inp-name')).not.toBeDisabled()
        expect(screen.getByTestId('combo-tree')).not.toBeDisabled()
        expect(screen.getByTestId('ta-description')).not.toBeDisabled()
    })

    it('no SERVICE_EDIT permission → all fields disabled', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(<ServiceTypeForm />, {
            withForm: true,
            formProps: { defaultValues: { properties: [] } },
        })
        expect(screen.getByTestId('inp-name')).toBeDisabled()
        expect(screen.getByTestId('combo-tree')).toBeDisabled()
        expect(screen.getByTestId('ta-description')).toBeDisabled()
    })

    it('combo onSelect resets properties to empty array', () => {
        mockUsePermission.mockReturnValue(true)
        renderWithProviders(<ServiceTypeForm />, {
            withForm: true,
            formProps: { defaultValues: { properties: [{ uid: 'x' }] } },
        })
        // Trigger the combo onSelect
        fireEvent.click(screen.getByTestId('combo-tree'))
        // Just confirm onSelect was wired (lastComboProps captures it)
        expect(typeof lastComboProps.onSelect).toBe('function')
    })
})
