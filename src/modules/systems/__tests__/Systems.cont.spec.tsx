import { render, screen } from '@testing-library/react'

import SystemsContainer from '../Systems.cont'

let lastSystemsComponentProps: any = null

jest.mock('../Systems.comp', () => ({
    SystemsComponent: (props: any) => {
        lastSystemsComponentProps = props
        return (
            <div
                data-testid="systems-component"
                data-tableid={props.tableId}
                data-global={String(props.isGlobalSearch)}
                data-edit={String(props.enableDragAndDrop)}
            />
        )
    },
}))

jest.mock('@/modules/shared/system/device-info-overlay/device-info', () => ({
    DeviceInfoOverlay: () => <div data-testid="device-overlay" />,
}))

jest.mock('@/modules/shared/form/FilterBadges', () => ({
    FilterBadges: ({ tableId }: { tableId: string }) => (
        <div data-testid="badges" data-tableid={tableId} />
    ),
}))

beforeEach(() => {
    lastSystemsComponentProps = null
})

describe('SystemsContainer', () => {
    it('renders SystemsComponent with global tableId=systems + isGlobalSearch=true', () => {
        render(<SystemsContainer />)
        const c = screen.getByTestId('systems-component')
        expect(c.dataset.tableid).toBe('systems')
        expect(c.dataset.global).toBe('true')
        expect(c.dataset.edit).toBe('false')
    })

    it('renders DeviceInfoOverlay', () => {
        render(<SystemsContainer />)
        expect(screen.getByTestId('device-overlay')).toBeInTheDocument()
    })

    it('SecondRowElement renders FilterBadges with tableId=systems', () => {
        render(<SystemsContainer />)
        const SecondRow = lastSystemsComponentProps.SecondRowElement
        render(<SecondRow />)
        const badges = screen.getAllByTestId('badges')
        expect(badges[badges.length - 1].dataset.tableid).toBe('systems')
    })
})
