import { render, screen } from '@testing-library/react'

import { StepIndicator } from '../StepIndicator'

const steps = [
    { id: 'a', title: 'Step A' },
    { id: 'b', title: 'Step B' },
    { id: 'c', title: 'Step C' },
]

describe('StepIndicator', () => {
    it('renders every step title', () => {
        render(<StepIndicator currentStep={0} totalSteps={steps.length} steps={steps} />)
        expect(screen.getByText('Step A')).toBeInTheDocument()
        expect(screen.getByText('Step B')).toBeInTheDocument()
        expect(screen.getByText('Step C')).toBeInTheDocument()
    })

    it('renders step indices 1..N', () => {
        render(<StepIndicator currentStep={1} totalSteps={steps.length} steps={steps} />)
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('marks active step with orange background', () => {
        const { container } = render(
            <StepIndicator currentStep={1} totalSteps={steps.length} steps={steps} />,
        )
        const circles = container.querySelectorAll('.rounded-full')
        expect(circles[0]).toHaveClass('bg-orange-500') // completed
        expect(circles[1]).toHaveClass('bg-orange-500') // active
        expect(circles[2]).toHaveClass('bg-gray-300') // future
    })

    it('renders connectors between non-final steps (count = N-1)', () => {
        const { container } = render(
            <StepIndicator currentStep={0} totalSteps={steps.length} steps={steps} />,
        )
        // Each connector has an SVG polygon
        const connectors = container.querySelectorAll('svg polygon')
        expect(connectors).toHaveLength(steps.length - 1)
    })

    it('handles single-step array without crashing', () => {
        render(<StepIndicator currentStep={0} totalSteps={1} steps={[steps[0]]} />)
        expect(screen.getByText('Step A')).toBeInTheDocument()
    })

    it('returns empty rendering for undefined/null steps', () => {
        const { container } = render(
            <StepIndicator currentStep={0} totalSteps={0} steps={undefined as any} />,
        )
        // Wrapper still rendered, but no step circles
        expect(container.querySelectorAll('.rounded-full').length).toBe(0)
    })
})
