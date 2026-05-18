import { render, screen } from '@testing-library/react'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../card'

describe('ui/Card components', () => {
    it('each sub-component renders with its data-slot', () => {
        render(
            <Card data-testid="card">
                <CardHeader data-testid="hdr">
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Desc</CardDescription>
                    <CardAction>
                        <button>X</button>
                    </CardAction>
                </CardHeader>
                <CardContent data-testid="content">Content</CardContent>
                <CardFooter data-testid="footer">Footer</CardFooter>
            </Card>,
        )
        expect(screen.getByTestId('card').getAttribute('data-slot')).toBe('card')
        expect(screen.getByTestId('hdr').getAttribute('data-slot')).toBe('card-header')
        expect(screen.getByText('Title').getAttribute('data-slot')).toBe('card-title')
        expect(screen.getByText('Desc').getAttribute('data-slot')).toBe('card-description')
        expect(screen.getByRole('button').parentElement?.getAttribute('data-slot')).toBe(
            'card-action',
        )
        expect(screen.getByTestId('content').getAttribute('data-slot')).toBe('card-content')
        expect(screen.getByTestId('footer').getAttribute('data-slot')).toBe('card-footer')
    })

    it('Card appends className', () => {
        const { container } = render(<Card className="extra-x" />)
        expect(container.querySelector('[data-slot="card"]')?.className).toContain('extra-x')
    })
})
