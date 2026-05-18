import { render } from '@testing-library/react'

import { TreeNodeSkeleton } from '../TreeNodeSkeleton.comp'

describe('TreeNodeSkeleton', () => {
    it('renders 8 rows by default', () => {
        const { container } = render(<TreeNodeSkeleton />)
        expect(container.querySelectorAll('.flex.items-center.gap-2.py-1').length).toBe(8)
    })

    it('renders custom count of rows', () => {
        const { container } = render(<TreeNodeSkeleton count={3} />)
        expect(container.querySelectorAll('.flex.items-center.gap-2.py-1').length).toBe(3)
    })

    it('stair-steps padding using (i % 3) * 16', () => {
        const { container } = render(<TreeNodeSkeleton count={4} />)
        const rows = Array.from(
            container.querySelectorAll<HTMLDivElement>('.flex.items-center.gap-2.py-1'),
        )
        expect(rows[0].style.paddingLeft).toBe('0px')
        expect(rows[1].style.paddingLeft).toBe('16px')
        expect(rows[2].style.paddingLeft).toBe('32px')
        expect(rows[3].style.paddingLeft).toBe('0px')
    })

    it('renders 0 rows when count=0', () => {
        const { container } = render(<TreeNodeSkeleton count={0} />)
        expect(container.querySelectorAll('.flex.items-center.gap-2.py-1').length).toBe(0)
    })
})
