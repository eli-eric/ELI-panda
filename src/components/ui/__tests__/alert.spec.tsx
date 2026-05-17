import { render, screen } from '@testing-library/react'

import { Alert, AlertDescription, AlertTitle } from '../alert'

describe('ui/Alert', () => {
    it('renders root with role="alert" and data-slot="alert"', () => {
        render(
            <Alert>
                <AlertTitle>Title</AlertTitle>
                <AlertDescription>Body</AlertDescription>
            </Alert>,
        )
        expect(screen.getByRole('alert').getAttribute('data-slot')).toBe('alert')
    })

    it('default variant uses bg-card text-card-foreground', () => {
        const { container } = render(<Alert>x</Alert>)
        expect(container.querySelector('[data-slot="alert"]')?.className).toContain('bg-card')
    })

    it('destructive variant applies text-destructive', () => {
        const { container } = render(<Alert variant="destructive">x</Alert>)
        expect(container.querySelector('[data-slot="alert"]')?.className).toContain(
            'text-destructive',
        )
    })

    it('AlertTitle + AlertDescription render with their data-slot', () => {
        render(
            <Alert>
                <AlertTitle>Title</AlertTitle>
                <AlertDescription>Body</AlertDescription>
            </Alert>,
        )
        expect(screen.getByText('Title').getAttribute('data-slot')).toBe('alert-title')
        expect(screen.getByText('Body').getAttribute('data-slot')).toBe('alert-description')
    })

    it('Alert appends className', () => {
        const { container } = render(<Alert className="my-x">x</Alert>)
        expect(container.querySelector('[data-slot="alert"]')?.className).toContain('my-x')
    })
})
