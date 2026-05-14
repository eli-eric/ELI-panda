import { render } from '@testing-library/react'

import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'

import { ServiceLineGroups } from '../service-line.groups'

jest.mock('@/modules/catalogueItem/hooks/useGroupDetails', () => ({
    __esModule: true,
    default: jest.fn(),
}))

let lastGroupMap: Map<string, any[]> | null = null

jest.mock('../detail-properties.list', () => ({
    DetailPropertiesList: ({ groupMap }: { groupMap: Map<string, any[]> }) => {
        lastGroupMap = groupMap
        return <div data-testid="list" />
    },
}))

const mockUseGroupDetails = useGroupDetails as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastGroupMap = null
})

describe('ServiceLineGroups', () => {
    it('filters by allowedDetails and groups properties by propertyGroup', () => {
        mockUseGroupDetails.mockReturnValue({
            groupDetails: [
                { property: { uid: 'a', name: 'B' }, propertyGroup: 'G1', value: 'va' },
                { property: { uid: 'b', name: 'A' }, propertyGroup: 'G1', value: 'vb' },
                { property: { uid: 'c', name: 'C' }, propertyGroup: 'G2', value: 'vc' },
                { property: { uid: 'skip', name: 'X' }, propertyGroup: 'G3', value: 'vx' },
            ],
        })
        render(
            <ServiceLineGroups
                category={{ uid: 'cat-1', name: 'C' } as any}
                allowedDetails={['a', 'b', 'c']}
            />,
        )
        expect(lastGroupMap).not.toBeNull()
        expect(Array.from(lastGroupMap!.keys())).toEqual(['G1', 'G2'])
        expect(lastGroupMap!.get('G1')!.map((p: any) => p.property.uid)).toEqual(['b', 'a'])
        expect(lastGroupMap!.get('G2')!.map((p: any) => p.property.uid)).toEqual(['c'])
    })

    it('produces empty Map when no groupDetails', () => {
        mockUseGroupDetails.mockReturnValue({ groupDetails: undefined })
        render(<ServiceLineGroups category={{ uid: 'x', name: 'x' } as any} allowedDetails={[]} />)
        expect(lastGroupMap!.size).toBe(0)
    })

    it('passes category.uid to useGroupDetails', () => {
        mockUseGroupDetails.mockReturnValue({ groupDetails: [] })
        render(
            <ServiceLineGroups
                category={{ uid: 'cat-99', name: 'X' } as any}
                allowedDetails={[]}
            />,
        )
        expect(mockUseGroupDetails).toHaveBeenCalledWith('cat-99')
    })
})
