import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders as render } from '@/testutils/wrappers/renderWithProviders'

import { LeavesEmptyState } from '../LeavesEmptyState.comp'

let onShowAllLevels: jest.Mock
let onClearFilters: jest.Mock

const renderEmptyState = (props: Partial<React.ComponentProps<typeof LeavesEmptyState>> = {}) =>
    render(
        <LeavesEmptyState
            directOnly={false}
            hasNarrowedQuery={false}
            onShowAllLevels={onShowAllLevels}
            onClearFilters={onClearFilters}
            {...props}
        />,
    )

beforeEach(() => {
    onShowAllLevels = jest.fn()
    onClearFilters = jest.fn()
})

describe('LeavesEmptyState', () => {
    it('blames the filters when only they are narrowing', () => {
        renderEmptyState({ hasNarrowedQuery: true })

        expect(screen.getByText('No subsystems found')).toBeInTheDocument()
        expect(screen.getByTestId('leaves-clear-filters')).toBeInTheDocument()
        expect(screen.queryByTestId('leaves-show-all-levels')).toBeNull()
    })

    it('blames the scope when only direct-only is on', () => {
        renderEmptyState({ directOnly: true })

        expect(
            screen.getByText('No end systems directly under this system'),
        ).toBeInTheDocument()
        expect(screen.getByTestId('leaves-show-all-levels')).toBeInTheDocument()
        expect(screen.queryByTestId('leaves-clear-filters')).toBeNull()
    })

    it('names both causes when both apply, instead of asserting something false', () => {
        // The scope-only message would claim there are no direct end systems, which may
        // well be untrue — the filter could be what excluded them.
        renderEmptyState({ directOnly: true, hasNarrowedQuery: true })

        expect(
            screen.getByText(
                'No end systems directly under this system match the current search and filters',
            ),
        ).toBeInTheDocument()
    })

    it('offers both escapes when both apply, so recovery is one click either way', () => {
        renderEmptyState({ directOnly: true, hasNarrowedQuery: true })

        fireEvent.click(screen.getByTestId('leaves-show-all-levels'))
        expect(onShowAllLevels).toHaveBeenCalled()

        fireEvent.click(screen.getByTestId('leaves-clear-filters'))
        expect(onClearFilters).toHaveBeenCalled()
    })
})
