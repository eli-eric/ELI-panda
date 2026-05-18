import { fireEvent, render, screen } from '@testing-library/react'

import { CategoryName } from '../CategoryNameCell'

jest.mock('@/components/decorators', () => ({
    LinkDecorator: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

const props = (val: any, setCategoryFilter?: (v: any) => void) => ({
    getValue: () => val,
    setCategoryFilter,
}) as any

describe('CategoryName', () => {
    it('renders category name', () => {
        render(<CategoryName {...props({ uid: 'c1', name: 'Optics' })} />)
        expect(screen.getByText('Optics')).toBeInTheDocument()
    })

    it('click invokes setCategoryFilter with {uid, name}', () => {
        const setCategoryFilter = jest.fn()
        render(
            <CategoryName
                {...props({ uid: 'c1', name: 'Optics' }, setCategoryFilter)}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: 'c1', name: 'Optics' })
    })

    it('click is a no-op when no setCategoryFilter prop provided', () => {
        render(<CategoryName {...props({ uid: 'c1', name: 'Optics' })} />)
        expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow()
    })

    it('handles undefined value safely (uid=undefined, name=undefined)', () => {
        const setCategoryFilter = jest.fn()
        render(<CategoryName {...props(undefined, setCategoryFilter)} />)
        fireEvent.click(screen.getByRole('button'))
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: undefined, name: undefined })
    })
})
