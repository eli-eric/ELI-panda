import { render } from '@testing-library/react'

import { WizardStep } from '../WizardStep'

describe('WizardStep', () => {
    it('renders nothing (presence marker only)', () => {
        const { container } = render(
            <WizardStep id="x" title="Step" validate={() => true}>
                <div>child</div>
            </WizardStep>,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('accepts validate / shouldShow / hideDefaultNavigation props without rendering', () => {
        const { container } = render(
            <WizardStep
                id="x"
                title="Step"
                validate={() => true}
                shouldShow={() => false}
                hideDefaultNavigation
            >
                <div />
            </WizardStep>,
        )
        expect(container).toBeEmptyDOMElement()
    })
})
