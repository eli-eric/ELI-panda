import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemHierarchy } from '../SystemHierarchy.comp'

jest.mock('@/components/ui', () => ({
    Disclosure: ({ children, title }: { children: ReactNode; title: string }) => (
        <div data-testid="disclosure">
            <div>{title}</div>
            {children}
        </div>
    ),
}))

jest.mock('@/modules/shared/system/device-info-overlay/store/useShowDeviceStore', () => ({
    useSystemStore: jest.fn(),
}))

const mockUseSystemStore = useSystemStore as unknown as jest.Mock

let setUID: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setUID = jest.fn()
    mockUseSystemStore.mockReturnValue({ setUID })
})

describe('SystemHierarchy', () => {
    it('returns null for empty parentPath', () => {
        const { container } = renderWithProviders(
            <SystemHierarchy parentPath={[]} currentSystemName="Cur" />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders one item per parent + current system name', () => {
        renderWithProviders(
            <SystemHierarchy
                parentPath={[
                    { uid: 'a', name: 'A' } as any,
                    { uid: 'b', name: 'B' } as any,
                ]}
                currentSystemName="Cur"
            />,
        )
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('Cur')).toBeInTheDocument()
    })

    it('parent with uid renders as button; click triggers setUID', () => {
        renderWithProviders(
            <SystemHierarchy
                parentPath={[{ uid: 'a-1', name: 'Alpha' } as any]}
                currentSystemName="Cur"
            />,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Alpha' }))
        expect(setUID).toHaveBeenCalledWith('a-1')
    })

    it('parent without uid renders as span (no button)', () => {
        renderWithProviders(
            <SystemHierarchy
                parentPath={[{ name: 'NoUid' } as any]}
                currentSystemName="Cur"
            />,
        )
        expect(screen.queryByRole('button', { name: 'NoUid' })).toBeNull()
        expect(screen.getByText('NoUid')).toBeInTheDocument()
    })

    it('renders "Unknown" when parent name missing', () => {
        renderWithProviders(
            <SystemHierarchy
                parentPath={[{ uid: 'a' } as any]}
                currentSystemName="Cur"
            />,
        )
        expect(screen.getByText('Unknown')).toBeInTheDocument()
    })

    it('withDirtyProtection wraps the click handler', () => {
        const withDirtyProtection = jest.fn(
            (cb: (...args: any[]) => void) => (...args: any[]) => cb(...args),
        )
        renderWithProviders(
            <SystemHierarchy
                parentPath={[{ uid: 'p', name: 'P' } as any]}
                currentSystemName="Cur"
                withDirtyProtection={withDirtyProtection as any}
            />,
        )
        fireEvent.click(screen.getByRole('button', { name: 'P' }))
        expect(withDirtyProtection).toHaveBeenCalled()
        expect(setUID).toHaveBeenCalledWith('p')
    })
})
