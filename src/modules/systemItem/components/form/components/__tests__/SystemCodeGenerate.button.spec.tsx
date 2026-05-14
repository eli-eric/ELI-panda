import { fireEvent, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemCodeButton } from '../SystemCodeGenerate.button'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemCodeClear', () => ({
    useSystemCodeClear: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useSystemCodeGenerate', () => ({
    useSystemCodeGenerate: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseSystemCodeClear = useSystemCodeClear as jest.Mock
const mockUseSystemCodeGenerate = useSystemCodeGenerate as jest.Mock

let getSystemCode: jest.Mock
let clearSystemCode: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    getSystemCode = jest.fn()
    clearSystemCode = jest.fn()
    mockUseRouter.mockReturnValue({ query: { uid: 'sys-1' } })
    mockUseSystemCodeGenerate.mockReturnValue({
        loading: false,
        getSystemCode,
        disabled: false,
    })
    mockUseSystemCodeClear.mockReturnValue({ clearSystemCode, loading: false })
})

describe('SystemCodeButton', () => {
    it('renders Generate and Release buttons', () => {
        renderWithProviders(<SystemCodeButton />)
        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('Generate click invokes getSystemCode', () => {
        renderWithProviders(<SystemCodeButton />)
        const [generate] = screen.getAllByRole('button')
        fireEvent.click(generate)
        expect(getSystemCode).toHaveBeenCalled()
    })

    it('Release click invokes clearSystemCode with uid', () => {
        renderWithProviders(<SystemCodeButton />)
        const [, release] = screen.getAllByRole('button')
        fireEvent.click(release)
        expect(clearSystemCode).toHaveBeenCalledWith({
            where: { uid: 'sys-1' },
            update: { systemCode: null },
        })
    })

    it('Release click is a no-op without uid', () => {
        mockUseRouter.mockReturnValue({ query: {} })
        renderWithProviders(<SystemCodeButton />)
        const [, release] = screen.getAllByRole('button')
        fireEvent.click(release)
        expect(clearSystemCode).not.toHaveBeenCalled()
    })

    it('both buttons disabled when generate hook reports disabled', () => {
        mockUseSystemCodeGenerate.mockReturnValue({
            loading: false,
            getSystemCode,
            disabled: true,
        })
        renderWithProviders(<SystemCodeButton />)
        for (const btn of screen.getAllByRole('button')) {
            expect(btn).toBeDisabled()
        }
    })
})
