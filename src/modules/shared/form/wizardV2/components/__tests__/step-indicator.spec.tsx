import { render, screen } from '@testing-library/react'

import { StepIndicator } from '../step-indicator'

const steps = [
    { title: 'One', fields: [] },
    { title: 'Two', fields: [] },
    { title: 'Three', fields: [] },
] as any

describe('wizardV2 StepIndicator', () => {
    it('renders titles + indices', () => {
        render(<StepIndicator currentStep={1} totalSteps={3} steps={steps} />)
        expect(screen.getByText('One')).toBeInTheDocument()
        expect(screen.getByText('Two')).toBeInTheDocument()
        expect(screen.getByText('Three')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('marks completed + active + future via background class', () => {
        const { container } = render(
            <StepIndicator currentStep={1} totalSteps={3} steps={steps} />,
        )
        const circles = container.querySelectorAll('.rounded-full')
        expect(circles[0]).toHaveClass('bg-orange-500') // completed
        expect(circles[1]).toHaveClass('bg-orange-500') // active
        expect(circles[2]).toHaveClass('bg-gray-300') // future
    })

    it('renders N-1 connector polygons', () => {
        const { container } = render(
            <StepIndicator currentStep={0} totalSteps={3} steps={steps} />,
        )
        expect(container.querySelectorAll('svg polygon')).toHaveLength(2)
    })

    it('handles empty/undefined steps', () => {
        const { container: cEmpty } = render(
            <StepIndicator currentStep={0} totalSteps={0} steps={[]} />,
        )
        expect(cEmpty.querySelectorAll('.rounded-full').length).toBe(0)

        const { container: cUndef } = render(
            <StepIndicator currentStep={0} totalSteps={0} steps={undefined as any} />,
        )
        expect(cUndef.querySelectorAll('.rounded-full').length).toBe(0)
    })
})
