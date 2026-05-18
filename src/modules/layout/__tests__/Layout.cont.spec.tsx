import { render } from '@testing-library/react'

import { useShowDeviceStore } from '../../shared/system/device-info-overlay/store/useShowDeviceStore'
import LayoutContainer from '../Layout.cont'

jest.mock('../../shared/system/device-info-overlay/store/useShowDeviceStore', () => ({
    useShowDeviceStore: jest.fn(),
}))

jest.mock('../../shared/system/device-info-overlay/device-info', () => ({
    DeviceInfoOverlay: () => <div data-testid="overlay" />,
}))

const mockUseShowDeviceStore = useShowDeviceStore as unknown as jest.Mock

let setCode: jest.Mock
let setUID: jest.Mock
let setLocationCode: jest.Mock
let setOpenDeviceInfo: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setCode = jest.fn()
    setUID = jest.fn()
    setLocationCode = jest.fn()
    setOpenDeviceInfo = jest.fn()
    mockUseShowDeviceStore.mockReturnValue({
        setCode,
        setUID,
        setLocationCode,
        setOpenDeviceInfo,
    })
})

const fireMessage = (href: string) => {
    const event = new MessageEvent('message', { data: { type: 'navigate', href } })
    window.dispatchEvent(event)
}

describe('LayoutContainer', () => {
    it('window message with getDeviceInfo sets code + opens overlay', () => {
        render(<LayoutContainer />)
        fireMessage('https://x.com?getDeviceInfo=SC-1')
        expect(setCode).toHaveBeenCalledWith('SC-1')
        expect(setOpenDeviceInfo).toHaveBeenCalledWith(true)
    })

    it('window message with getOfficeInfo sets locationCode + opens overlay', () => {
        render(<LayoutContainer />)
        fireMessage('https://x.com?getOfficeInfo=L-1')
        expect(setLocationCode).toHaveBeenCalledWith('L-1')
        expect(setOpenDeviceInfo).toHaveBeenCalledWith(true)
    })

    it('window message with no recognised query does nothing', () => {
        render(<LayoutContainer />)
        fireMessage('https://x.com?unrelated=1')
        expect(setCode).not.toHaveBeenCalled()
        expect(setLocationCode).not.toHaveBeenCalled()
        expect(setOpenDeviceInfo).not.toHaveBeenCalled()
    })

    it('unmount cleanup resets code/locationCode/uid + closes overlay', () => {
        const { unmount } = render(<LayoutContainer />)
        unmount()
        expect(setCode).toHaveBeenCalledWith(undefined)
        expect(setLocationCode).toHaveBeenCalledWith(undefined)
        expect(setUID).toHaveBeenCalledWith(undefined)
        expect(setOpenDeviceInfo).toHaveBeenCalledWith(false)
    })
})
