import { fireEvent, render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'

import { Form } from '../Form'

jest.mock('@/hooks/form/useFormNotification', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../FormLeaveWarning', () => ({
    FormLeaveWarning: () => <div data-testid="leave-warning" />,
}))

const Wrapper = ({
    onSubmit,
    enableLeaveWarning,
}: {
    onSubmit?: (data: any) => void
    enableLeaveWarning?: boolean
}) => {
    const methods = useForm({ defaultValues: { name: '' } })
    return (
        <Form
            formMethods={methods}
            onSubmit={onSubmit}
            enableLeaveWarning={enableLeaveWarning}
            className="my-form"
        >
            <input data-testid="kid" {...methods.register('name')} />
            <button type="submit">Submit</button>
        </Form>
    )
}

describe('Form', () => {
    it('renders children + className on form', () => {
        const { container } = render(<Wrapper />)
        expect(screen.getByTestId('kid')).toBeInTheDocument()
        expect(container.querySelector('form')?.className).toContain('my-form')
    })

    it('calls onSubmit with form data on submit', async () => {
        const onSubmit = jest.fn()
        render(<Wrapper onSubmit={onSubmit} />)
        fireEvent.input(screen.getByTestId('kid'), { target: { value: 'Foo' } })
        fireEvent.click(screen.getByText('Submit'))
        await new Promise(r => setTimeout(r, 0))
        expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Foo' }),
            expect.anything(),
        )
    })

    it('prevents default submit when no onSubmit', () => {
        const { container } = render(<Wrapper />)
        const form = container.querySelector('form')!
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
        Object.defineProperty(submitEvent, 'preventDefault', {
            value: jest.fn(),
        })
        form.dispatchEvent(submitEvent)
        expect((submitEvent as any).preventDefault).toHaveBeenCalled()
    })

    it('renders FormLeaveWarning when enableLeaveWarning=true', () => {
        render(<Wrapper enableLeaveWarning />)
        expect(screen.getByTestId('leave-warning')).toBeInTheDocument()
    })

    it('hides FormLeaveWarning when enableLeaveWarning=false', () => {
        render(<Wrapper />)
        expect(screen.queryByTestId('leave-warning')).toBeNull()
    })
})
