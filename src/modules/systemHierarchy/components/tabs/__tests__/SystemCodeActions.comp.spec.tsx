import { fireEvent, screen } from '@testing-library/react'

import useWarningModal from '@/hooks/useWarningModal'
import {
    useSystemCodeClear,
    useSystemCodeGenerate,
} from '@/modules/systemHierarchy/hooks'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemCodeActions } from '../SystemCodeActions.comp'

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/systemHierarchy/hooks', () => ({
    useSystemCodeClear: jest.fn(),
    useSystemCodeGenerate: jest.fn(),
}))

const mockUseWarningModal = useWarningModal as jest.Mock
const mockUseSystemCodeGenerate = useSystemCodeGenerate as jest.Mock
const mockUseSystemCodeClear = useSystemCodeClear as jest.Mock

let generateCode: jest.Mock
let clearCode: jest.Mock
let warningWrapper: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    generateCode = jest.fn()
    clearCode = jest.fn()
    warningWrapper = jest.fn(fn => () => fn())
    mockUseWarningModal.mockReturnValue(warningWrapper)
    mockUseSystemCodeGenerate.mockReturnValue({
        generateCode,
        isGenerating: false,
        disabled: false,
    })
    mockUseSystemCodeClear.mockReturnValue({ clearCode, isClearing: false })
})

describe('SystemCodeActions', () => {
    it('Generate without existing code calls generateCode directly (no warning)', () => {
        renderWithProviders(
            <SystemCodeActions system={{ uid: 'u-1', systemCode: '' } as any} />,
        )
        const [generate] = screen.getAllByRole('button')
        fireEvent.click(generate)
        expect(generateCode).toHaveBeenCalled()
        expect(warningWrapper).not.toHaveBeenCalledWith(generateCode)
    })

    it('Generate with existing code wraps in warning modal', () => {
        renderWithProviders(
            <SystemCodeActions system={{ uid: 'u-1', systemCode: 'OLD-1' } as any} />,
        )
        const [generate] = screen.getAllByRole('button')
        fireEvent.click(generate)
        expect(warningWrapper).toHaveBeenCalledWith(generateCode)
    })

    it('Release button disabled when no code', () => {
        renderWithProviders(
            <SystemCodeActions system={{ uid: 'u-1', systemCode: '' } as any} />,
        )
        const [, release] = screen.getAllByRole('button')
        expect(release).toBeDisabled()
    })

    it('Release button enabled when has code + click invokes clearCode', () => {
        renderWithProviders(
            <SystemCodeActions system={{ uid: 'u-1', systemCode: 'X-1' } as any} />,
        )
        const [, release] = screen.getAllByRole('button')
        expect(release).not.toBeDisabled()
        fireEvent.click(release)
        expect(clearCode).toHaveBeenCalled()
    })

    it('disabled prop disables both buttons', () => {
        renderWithProviders(
            <SystemCodeActions
                system={{ uid: 'u-1', systemCode: 'C-1' } as any}
                disabled
            />,
        )
        const buttons = screen.getAllByRole('button')
        buttons.forEach(b => expect(b).toBeDisabled())
    })

    it('Generate is disabled when generateDisabled from hook', () => {
        mockUseSystemCodeGenerate.mockReturnValue({
            generateCode,
            isGenerating: false,
            disabled: true,
        })
        renderWithProviders(
            <SystemCodeActions system={{ uid: 'u-1', systemCode: '' } as any} />,
        )
        const [generate] = screen.getAllByRole('button')
        expect(generate).toBeDisabled()
    })

    it('Generate disabled while isGenerating', () => {
        mockUseSystemCodeGenerate.mockReturnValue({
            generateCode,
            isGenerating: true,
            disabled: false,
        })
        renderWithProviders(
            <SystemCodeActions system={{ uid: 'u-1', systemCode: '' } as any} />,
        )
        const [generate] = screen.getAllByRole('button')
        expect(generate).toBeDisabled()
    })
})
