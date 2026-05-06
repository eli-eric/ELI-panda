import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { SystemBreadcrumbs } from '../SystemBreadcrumbs.comp'

const path = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ uid: `u${i}`, name: `A${i}` }))

describe('SystemBreadcrumbs', () => {
    it('renders only current name when parentPath is null', () => {
        render(
            <SystemBreadcrumbs
                parentPath={null}
                currentName="Root"
                onSelectAncestor={jest.fn()}
            />,
        )
        expect(screen.getByTestId('system-breadcrumb-current')).toHaveTextContent('Root')
        expect(screen.queryAllByTestId('system-breadcrumb-ancestor')).toHaveLength(0)
        expect(screen.queryByTestId('system-breadcrumb-ellipsis')).not.toBeInTheDocument()
    })

    it('renders all ancestors + current when total displayed <= 4', () => {
        render(
            <SystemBreadcrumbs
                parentPath={path(3)}
                currentName="Leaf"
                onSelectAncestor={jest.fn()}
            />,
        )
        const ancestors = screen.getAllByTestId('system-breadcrumb-ancestor')
        expect(ancestors).toHaveLength(3)
        expect(ancestors[0]).toHaveTextContent('A0')
        expect(ancestors[2]).toHaveTextContent('A2')
        expect(screen.getByTestId('system-breadcrumb-current')).toHaveTextContent('Leaf')
        expect(screen.queryByTestId('system-breadcrumb-ellipsis')).not.toBeInTheDocument()
    })

    it('collapses middle ancestors with ellipsis when total displayed > 4', () => {
        render(
            <SystemBreadcrumbs
                parentPath={path(5)}
                currentName="Leaf"
                onSelectAncestor={jest.fn()}
            />,
        )
        const ancestors = screen.getAllByTestId('system-breadcrumb-ancestor')
        // first + last two ancestors visible
        expect(ancestors).toHaveLength(3)
        expect(ancestors[0]).toHaveTextContent('A0')
        expect(ancestors[1]).toHaveTextContent('A3')
        expect(ancestors[2]).toHaveTextContent('A4')
        expect(screen.getByTestId('system-breadcrumb-ellipsis')).toBeInTheDocument()
    })

    it('collapses correctly for very deep paths', () => {
        render(
            <SystemBreadcrumbs
                parentPath={path(10)}
                currentName="Leaf"
                onSelectAncestor={jest.fn()}
            />,
        )
        const ancestors = screen.getAllByTestId('system-breadcrumb-ancestor')
        expect(ancestors.map(b => b.textContent)).toEqual(['A0', 'A8', 'A9'])
        expect(screen.getByTestId('system-breadcrumb-ellipsis')).toBeInTheDocument()
    })

    it('fires onSelectAncestor with uid + hint when an ancestor is clicked', () => {
        const onSelectAncestor = jest.fn()
        render(
            <SystemBreadcrumbs
                parentPath={path(3)}
                currentName="Leaf"
                onSelectAncestor={onSelectAncestor}
            />,
        )
        fireEvent.click(screen.getAllByTestId('system-breadcrumb-ancestor')[1])
        expect(onSelectAncestor).toHaveBeenCalledWith('u1', {
            name: 'A1',
            parentPath: [{ uid: 'u0', name: 'A0' }],
        })
    })

    it('hint slices full original parentPath even when ellipsis collapses display', () => {
        const onSelectAncestor = jest.fn()
        render(
            <SystemBreadcrumbs
                parentPath={path(6)}
                currentName="Leaf"
                onSelectAncestor={onSelectAncestor}
            />,
        )
        // Click the visible second-to-last ancestor (A4 — original index 4)
        const buttons = screen.getAllByTestId('system-breadcrumb-ancestor')
        fireEvent.click(buttons[1]) // visible: [A0, A4, A5]
        expect(onSelectAncestor).toHaveBeenCalledWith('u4', {
            name: 'A4',
            parentPath: [
                { uid: 'u0', name: 'A0' },
                { uid: 'u1', name: 'A1' },
                { uid: 'u2', name: 'A2' },
                { uid: 'u3', name: 'A3' },
            ],
        })
    })

    it('current item is not a button', () => {
        render(
            <SystemBreadcrumbs
                parentPath={path(2)}
                currentName="Leaf"
                onSelectAncestor={jest.fn()}
            />,
        )
        const current = screen.getByTestId('system-breadcrumb-current')
        expect(current.tagName).not.toBe('BUTTON')
    })

    it('renders code chip when currentCode is provided', () => {
        render(
            <SystemBreadcrumbs
                parentPath={path(1)}
                currentName="Leaf"
                currentCode="LF-001"
                onSelectAncestor={jest.fn()}
            />,
        )
        expect(screen.getByText('LF-001')).toBeInTheDocument()
    })

    it('omits code chip when currentCode is null', () => {
        render(
            <SystemBreadcrumbs
                parentPath={path(1)}
                currentName="Leaf"
                currentCode={null}
                onSelectAncestor={jest.fn()}
            />,
        )
        expect(screen.queryByText(/LF-/)).not.toBeInTheDocument()
    })
})
