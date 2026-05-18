import { fireEvent, render, screen } from '@testing-library/react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible'

describe('ui/Collapsible', () => {
    it('content is closed by default', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>toggle</CollapsibleTrigger>
                <CollapsibleContent>body</CollapsibleContent>
            </Collapsible>,
        )
        expect(screen.queryByText('body')).toBeNull()
    })

    it('clicking trigger opens content', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>toggle</CollapsibleTrigger>
                <CollapsibleContent>body</CollapsibleContent>
            </Collapsible>,
        )
        fireEvent.click(screen.getByText('toggle'))
        expect(screen.getByText('body')).toBeInTheDocument()
    })

    it('Collapsible root has data-slot="collapsible"', () => {
        const { container } = render(
            <Collapsible>
                <CollapsibleTrigger>t</CollapsibleTrigger>
                <CollapsibleContent>c</CollapsibleContent>
            </Collapsible>,
        )
        expect(container.querySelector('[data-slot="collapsible"]')).not.toBeNull()
    })

    it('controlled open=true shows content', () => {
        render(
            <Collapsible open={true}>
                <CollapsibleTrigger>toggle</CollapsibleTrigger>
                <CollapsibleContent>body</CollapsibleContent>
            </Collapsible>,
        )
        expect(screen.getByText('body')).toBeInTheDocument()
    })
})
