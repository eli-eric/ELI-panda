import { render, screen } from '@testing-library/react'

import { RoomCardStatusIcon } from '../RoomCardStatusIcon'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

describe('RoomCardStatusIcon', () => {
    it.each([
        ['DIRTY_MODE', 'bg-red-200'],
        ['CLEAN_MODE', 'bg-lime-200'],
        ['IN_PREPARATION_MODE', 'bg-orange-300'],
    ])('renders %s status with class containing %s', (status, expected) => {
        const { container } = render(<RoomCardStatusIcon status={status as any} />)
        const circle = container.querySelector('[data-testid="tt"] > div')
        expect(circle?.className).toContain(expected)
    })

    it('tooltip content includes "Room status: {status}"', () => {
        render(<RoomCardStatusIcon status={'CLEAN_MODE' as any} />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Room status: CLEAN_MODE')
    })
})
