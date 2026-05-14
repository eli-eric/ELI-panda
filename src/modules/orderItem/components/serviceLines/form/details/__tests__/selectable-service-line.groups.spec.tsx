import { render } from '@testing-library/react'

import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'

import { SelectableServiceLineGroups } from '../selectable-service-line.groups'

jest.mock('@/modules/catalogueItem/hooks/useGroupDetails', () => ({
    __esModule: true,
    default: jest.fn(),
}))

let lastGroupMap: Map<string, any[]> | null = null

jest.mock('../selectable-detail-properties.list', () => ({
    SelectableDetailPropertiesList: ({ groupMap }: { groupMap: Map<string, any[]> }) => {
        lastGroupMap = groupMap
        return <div data-testid="list" />
    },
}))

const mockUseGroupDetails = useGroupDetails as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastGroupMap = null
})

describe('SelectableServiceLineGroups', () => {
    it('sorts groups alphabetically and inner details by name', () => {
        mockUseGroupDetails.mockReturnValue({
            groupDetails: [
                { property: { uid: 'a', name: 'Beta' }, propertyGroup: 'Z', value: 'v' },
                { property: { uid: 'b', name: 'Alpha' }, propertyGroup: 'Z', value: 'v' },
                { property: { uid: 'c', name: 'C' }, propertyGroup: 'A', value: 'v' },
            ],
        })
        render(
            <SelectableServiceLineGroups
                category={{ uid: 'cat-1', name: 'C' } as any}
                allowedDetails={['a', 'b', 'c']}
            />,
        )
        expect(Array.from(lastGroupMap!.keys())).toEqual(['A', 'Z'])
        expect(lastGroupMap!.get('Z')!.map((p: any) => p.property.uid)).toEqual(['b', 'a'])
    })

    it('returns empty Map when no groupDetails', () => {
        mockUseGroupDetails.mockReturnValue({ groupDetails: undefined })
        render(
            <SelectableServiceLineGroups
                category={{ uid: 'x', name: 'x' } as any}
                allowedDetails={[]}
            />,
        )
        expect(lastGroupMap!.size).toBe(0)
    })

    it('passes category.uid to useGroupDetails', () => {
        mockUseGroupDetails.mockReturnValue({ groupDetails: [] })
        render(
            <SelectableServiceLineGroups
                category={{ uid: 'cat-42', name: 'X' } as any}
                allowedDetails={[]}
            />,
        )
        expect(mockUseGroupDetails).toHaveBeenCalledWith('cat-42')
    })
})
