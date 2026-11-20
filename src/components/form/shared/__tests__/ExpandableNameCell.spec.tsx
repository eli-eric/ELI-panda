import { fireEvent, render, screen } from '@testing-library/react'

import { ExpandableNameCell } from '../ExpandableNameCell'

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

jest.mock('@/utils', () => ({
    highlightText: (text: string) => <span>{text}</span>,
}))

const makeRow = (overrides: Record<string, any> = {}) =>
    ({
        depth: 0,
        original: { uid: 'u1', isExpandable: overrides.isExpandable ?? false },
        getCanExpand: () => overrides.canExpand ?? false,
        getIsExpanded: () => overrides.isExpanded ?? false,
        toggleExpanded: overrides.toggleExpanded ?? jest.fn(),
    }) as any

describe('ExpandableNameCell', () => {
    it('non-expandable row renders no chevron and does not expand on name click', () => {
        const toggleExpanded = jest.fn()
        render(
            <ExpandableNameCell row={makeRow({ toggleExpanded })} getValue={() => 'Leaf'} />,
        )
        expect(screen.queryByRole('button')).toBeNull()
        fireEvent.click(screen.getByText('Leaf'))
        expect(toggleExpanded).not.toHaveBeenCalled()
    })

    it('chevron click expands, fetches children, and stops propagation to the row', () => {
        const toggleExpanded = jest.fn()
        const fetchChildren = jest.fn()
        const rowClick = jest.fn()
        render(
            <div onClick={rowClick}>
                <ExpandableNameCell
                    row={makeRow({ isExpandable: true, toggleExpanded })}
                    getValue={() => 'Group'}
                    fetchChildren={fetchChildren}
                />
            </div>,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(toggleExpanded).toHaveBeenCalledTimes(1)
        expect(fetchChildren).toHaveBeenCalledWith('u1')
        expect(rowClick).not.toHaveBeenCalled()
    })

    it('clicking the name of an expandable row selects (propagates) without expanding', () => {
        const toggleExpanded = jest.fn()
        const rowClick = jest.fn()
        render(
            <div onClick={rowClick}>
                <ExpandableNameCell
                    row={makeRow({ isExpandable: true, toggleExpanded })}
                    getValue={() => 'Group'}
                />
            </div>,
        )
        fireEvent.click(screen.getByText('Group'))
        expect(toggleExpanded).not.toHaveBeenCalled()
        expect(rowClick).toHaveBeenCalledTimes(1)
    })
})
