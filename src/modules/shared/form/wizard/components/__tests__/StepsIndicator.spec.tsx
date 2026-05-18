import { act, render, screen } from '@testing-library/react'

import { useWizardStore } from '../../store/useWizardStore'
import { StepIndicator } from '../StepsIndicator'

const steps = [
    { id: 1, name: 'Pick' },
    { id: 2, name: 'Fill' },
    { id: 3, name: 'Submit' },
]

const setStep = (n: number) =>
    act(() => useWizardStore.setState({ currentStep: n, formData: {} }))

beforeEach(() => useWizardStore.getState().resetWizard())

describe('wizard StepsIndicator', () => {
    it('renders every step name', () => {
        render(<StepIndicator steps={steps} />)
        expect(screen.getByText('Pick')).toBeInTheDocument()
        expect(screen.getByText('Fill')).toBeInTheDocument()
        expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    it('marks completed + active circles when currentStep advances', () => {
        setStep(2)
        const { container } = render(<StepIndicator steps={steps} />)
        const circles = container.querySelectorAll('.rounded-full')
        // index 0 completed, index 1 active, index 2 future
        expect(circles[0]).toHaveClass('bg-orange-500')
        expect(circles[1]).toHaveClass('bg-orange-500')
        expect(circles[2]).toHaveClass('bg-gray-300')
    })

    it('renders N-1 connector triangles', () => {
        const { container } = render(<StepIndicator steps={steps} />)
        expect(container.querySelectorAll('svg polygon')).toHaveLength(steps.length - 1)
    })

    it('renders cleanly for a single step', () => {
        setStep(1)
        const { container } = render(<StepIndicator steps={[steps[0]]} />)
        expect(container.querySelectorAll('svg').length).toBe(0)
    })

    it('shows step numbers 1..N', () => {
        render(<StepIndicator steps={steps} />)
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })
})
