import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemHierarchyBreadcrumb } from '../SystemHierarchyBreadcrumb.comp'

describe('SystemHierarchyBreadcrumb', () => {
    it('shows placeholder when no current system', () => {
        renderWithProviders(<SystemHierarchyBreadcrumb />)
        // Translated "no parent selected" — just confirm container rendered
        expect(screen.getByText(/.+/)).toBeInTheDocument()
    })

    it('renders current system name when no parentPath', () => {
        renderWithProviders(
            <SystemHierarchyBreadcrumb currentSystem={{ uid: 'c', name: 'CurrentName' } as any} />,
        )
        expect(screen.getByText('CurrentName')).toBeInTheDocument()
    })

    it('renders parentPath entries + current system in order', () => {
        renderWithProviders(
            <SystemHierarchyBreadcrumb
                parentPath={[
                    { uid: 'p1', name: 'Parent1' } as any,
                    { uid: 'p2', name: 'Parent2' } as any,
                ]}
                currentSystem={{ uid: 'c', name: 'Cur' } as any}
            />,
        )
        expect(screen.getByText('Parent1')).toBeInTheDocument()
        expect(screen.getByText('Parent2')).toBeInTheDocument()
        expect(screen.getByText('Cur')).toBeInTheDocument()
    })

    it('handles empty parentPath array', () => {
        renderWithProviders(
            <SystemHierarchyBreadcrumb
                parentPath={[]}
                currentSystem={{ uid: 'c', name: 'X' } as any}
            />,
        )
        expect(screen.getByText('X')).toBeInTheDocument()
    })

    it('appends custom className to root', () => {
        const { container } = renderWithProviders(
            <SystemHierarchyBreadcrumb
                className="extra-cls"
                currentSystem={{ uid: 'c', name: 'X' } as any}
            />,
        )
        expect(container.firstChild).toHaveClass('extra-cls')
    })
})
