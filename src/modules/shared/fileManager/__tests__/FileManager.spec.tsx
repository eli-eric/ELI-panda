import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import FileManager from '../FileManager'
import { FILE_TYPE } from '../types'

jest.mock('sonner', () => ({
    toast: {
        loading: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
        dismiss: jest.fn(),
    },
}))

jest.mock('react-dropzone', () => ({
    useDropzone: () => ({
        getRootProps: () => ({}),
        getInputProps: () => ({}),
        isDragActive: false,
    }),
}))

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: {
        get: jest.fn(() => Promise.resolve({ data: [] })),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}))

describe('FileManager render', () => {
    it('hides upload buttons when hasEditRole is false', () => {
        renderWithProviders(
            <FileManager itemType={FILE_TYPE.SYSTEM} uid="u1" hasEditRole={false} />,
        )
        expect(screen.queryByText(/upload file/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/add link/i)).not.toBeInTheDocument()
    })

    it('shows upload + add link buttons when hasEditRole is true', () => {
        renderWithProviders(
            <FileManager itemType={FILE_TYPE.SYSTEM} uid="u1" hasEditRole={true} />,
        )
        expect(screen.getByText(/upload file/i)).toBeInTheDocument()
        expect(screen.getByText(/add link/i)).toBeInTheDocument()
    })

    it('renders heading + drop zone', () => {
        renderWithProviders(
            <FileManager itemType={FILE_TYPE.SYSTEM} uid="u1" hasEditRole={true} />,
        )
        expect(screen.getByText(/drop files here or/i)).toBeInTheDocument()
        expect(screen.getByText(/browse/i)).toBeInTheDocument()
    })
})
