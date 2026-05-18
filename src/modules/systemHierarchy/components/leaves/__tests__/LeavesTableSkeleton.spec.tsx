import { render } from '@testing-library/react'

import { LeavesTableSkeleton } from '../LeavesTableSkeleton.comp'

describe('LeavesTableSkeleton', () => {
    it('renders 11 skeleton elements (header + 10 rows)', () => {
        const { container } = render(<LeavesTableSkeleton />)
        // each Skeleton renders a div with the skeleton class; there's 1 header + 10 rows
        const skeletons = container.querySelectorAll('div > div')
        expect(skeletons.length).toBeGreaterThanOrEqual(11)
    })

    it('outer container has padding + vertical spacing', () => {
        const { container } = render(<LeavesTableSkeleton />)
        expect(container.firstChild).toHaveClass('space-y-2', 'p-4')
    })
})
