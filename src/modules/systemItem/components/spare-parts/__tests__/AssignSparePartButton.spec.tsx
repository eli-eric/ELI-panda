import { fireEvent, render, screen } from '@testing-library/react'

import { useAssignSparesNavigation } from '@/modules/shared/hooks/useAssignSparesNavigation'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useSystemDetail } from '../../../hooks/useSystemDetail'
import { AssignSparePartButton } from '../AssignSparePartsButton'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/modules/shared/hooks/useAssignSparesNavigation', () => ({
    useAssignSparesNavigation: jest.fn(),
}))

jest.mock('../../../hooks/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))

const mockUseAssignSparesNavigation = useAssignSparesNavigation as jest.Mock
const mockUseSystemDetail = useSystemDetail as jest.Mock

let handler: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    handler = jest.fn()
    mockUseAssignSparesNavigation.mockReturnValue(handler)
    mockUseSystemDetail.mockReturnValue({ systemDetail: null, catalogueItem: null })
})

describe('AssignSparePartButton', () => {
    it('falls back to empty strings/null when systemDetail and catalogueItem missing', () => {
        renderWithProviders(<AssignSparePartButton />)
        expect(mockUseAssignSparesNavigation).toHaveBeenCalledWith({
            uid: '',
            parentPath: null,
            catalogueNumber: null,
        })
    })

    it('maps systemDetail + catalogueItem into navigation args', () => {
        mockUseSystemDetail.mockReturnValue({
            systemDetail: {
                uid: 'sys-1',
                parentPath: [
                    { uid: 'p1', name: 'P1', systemLevel: 1 },
                    { uid: null, name: null, systemLevel: null },
                ],
            },
            catalogueItem: { catalogueNumber: 'CAT-123' },
        })
        renderWithProviders(<AssignSparePartButton />)
        expect(mockUseAssignSparesNavigation).toHaveBeenCalledWith({
            uid: 'sys-1',
            parentPath: [
                { uid: 'p1', name: 'P1', systemLevel: 1 },
                { uid: '', name: '', systemLevel: null },
            ],
            catalogueNumber: 'CAT-123',
        })
    })

    it('click invokes the navigation handler', () => {
        renderWithProviders(<AssignSparePartButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(handler).toHaveBeenCalled()
    })
})
