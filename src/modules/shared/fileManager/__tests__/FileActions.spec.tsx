import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { FileActions, RenameModalContent } from '../FileActions'
import type { FileItemExtended } from '../types'
import { FILE_TYPE } from '../types'

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: { delete: jest.fn(() => Promise.resolve({})) },
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: () => (cb: () => void) => () => cb(),
}))

const fileItem: FileItemExtended = {
    id: 'f-1',
    name: 'report.pdf',
    url: 'https://example.com/report.pdf',
    size: 1024,
    tags: ['draft'],
    type: 'FILE',
}

const linkItem: FileItemExtended = {
    id: 'l-1',
    name: 'docs',
    url: 'https://example.com/docs',
    size: 0,
    tags: [],
    type: 'LINK',
}

describe('FileActions', () => {
    it('returns null when hasEditRole is false', () => {
        const { container } = renderWithProviders(
            <FileActions
                file={fileItem}
                hasEditRole={false}
                itemType={FILE_TYPE.SYSTEM}
                uid="u1"
                onUpdate={jest.fn()}
            />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders dropdown trigger when hasEditRole is true', () => {
        renderWithProviders(
            <FileActions
                file={fileItem}
                hasEditRole={true}
                itemType={FILE_TYPE.SYSTEM}
                uid="u1"
                onUpdate={jest.fn()}
            />,
        )
        expect(screen.getByLabelText(/file actions/i)).toBeInTheDocument()
    })

    it('opens dropdown trigger button without errors for FILE type', () => {
        renderWithProviders(
            <FileActions
                file={fileItem}
                hasEditRole={true}
                itemType={FILE_TYPE.SYSTEM}
                uid="u1"
                onUpdate={jest.fn()}
            />,
        )
        const trigger = screen.getByLabelText(/file actions/i)
        fireEvent.click(trigger)
        expect(trigger).toBeInTheDocument()
    })

    it('opens dropdown trigger button without errors for LINK type', () => {
        renderWithProviders(
            <FileActions
                file={linkItem}
                hasEditRole={true}
                itemType={FILE_TYPE.SYSTEM}
                uid="u1"
                onUpdate={jest.fn()}
            />,
        )
        const trigger = screen.getByLabelText(/file actions/i)
        fireEvent.click(trigger)
        expect(trigger).toBeInTheDocument()
    })
})

describe('RenameModalContent', () => {
    it('splits filename into base + extension on mount', () => {
        renderWithProviders(
            <RenameModalContent file={fileItem} onRename={jest.fn()} />,
        )
        const input = screen.getByLabelText(/new name/i) as HTMLInputElement
        expect(input.value).toBe('report')
        expect(screen.getByText('.pdf')).toBeInTheDocument()
    })

    it('LINK type keeps full name (no extension split)', () => {
        renderWithProviders(
            <RenameModalContent file={linkItem} onRename={jest.fn()} />,
        )
        const input = screen.getByLabelText(/new name/i) as HTMLInputElement
        expect(input.value).toBe('docs')
    })

    it('Continue button calls onRename with rejoined name + extension', () => {
        const onRename = jest.fn()
        const onClose = jest.fn()
        renderWithProviders(
            <RenameModalContent
                file={fileItem}
                onRename={onRename}
                onClose={onClose}
            />,
        )
        const input = screen.getByLabelText(/new name/i)
        fireEvent.change(input, { target: { value: 'final' } })
        fireEvent.click(screen.getByRole('button', { name: /continue/i }))
        expect(onRename).toHaveBeenCalledWith('final.pdf')
        expect(onClose).toHaveBeenCalled()
    })
})
