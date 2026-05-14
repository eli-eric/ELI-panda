import { fireEvent, render, screen } from '@testing-library/react'

import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'

import { SystemLink } from '../SystemLink.comp'

jest.mock('@/modules/shared/system/device-info-overlay/store/useShowDeviceStore', () => ({
    useShowDeviceStore: jest.fn(),
}))

const mockUseShowDeviceStore = useShowDeviceStore as unknown as jest.Mock
let setUID: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setUID = jest.fn()
    mockUseShowDeviceStore.mockReturnValue({ setUID })
})

describe('SystemLink', () => {
    it('renders children inside a button', () => {
        render(<SystemLink uid="x">Open</SystemLink>)
        expect(screen.getByRole('button')).toHaveTextContent('Open')
    })

    it('renders icon when provided', () => {
        render(
            <SystemLink uid="x" icon={<svg data-testid="icon" />}>
                Open
            </SystemLink>,
        )
        expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('shows external icon when external=true', () => {
        const { container } = render(
            <SystemLink uid="x" external>
                Open
            </SystemLink>,
        )
        // ExternalLink lucide-react renders an svg
        expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
    })

    it('does not render external icon by default', () => {
        const { container } = render(<SystemLink uid="x">Open</SystemLink>)
        expect(container.querySelector('svg')).toBeNull()
    })

    it('click calls setUID with the provided uid', () => {
        render(<SystemLink uid="abc">Open</SystemLink>)
        fireEvent.click(screen.getByRole('button'))
        expect(setUID).toHaveBeenCalledWith('abc')
    })

    it('click without uid passes undefined', () => {
        render(<SystemLink>Open</SystemLink>)
        fireEvent.click(screen.getByRole('button'))
        expect(setUID).toHaveBeenCalledWith(undefined)
    })

    it('appends custom className', () => {
        render(
            <SystemLink uid="x" className="my-extra">
                Open
            </SystemLink>,
        )
        expect(screen.getByRole('button').className).toContain('my-extra')
    })

    it('variant="button" uses button-style classes (border, bg-white)', () => {
        render(
            <SystemLink uid="x" variant="button">
                Open
            </SystemLink>,
        )
        const cls = screen.getByRole('button').className
        expect(cls).toContain('bg-white')
        expect(cls).toContain('border')
    })

    it('variant="link" (default) uses orange link classes', () => {
        render(<SystemLink uid="x">Open</SystemLink>)
        expect(screen.getByRole('button').className).toContain('text-orange-600')
    })
})
