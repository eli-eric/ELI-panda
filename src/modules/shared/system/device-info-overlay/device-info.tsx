import { useIntl } from 'react-intl'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { message } from '@/i18n/src/messages'

import { LocationInfo } from './components/location-info.comp'
import { useShowDeviceStore } from './store/useShowDeviceStore'

/**
 * Location info overlay for the facility layout (`getOfficeInfo=<code>` links).
 * Systems no longer have an overlay of their own — they open the Edit System sheet.
 */
export const DeviceInfoOverlay = () => {
    const { formatMessage: fm } = useIntl()
    const { setOpenDeviceInfo, openDeviceInfo, locationCode } = useShowDeviceStore()

    return (
        <Sheet open={openDeviceInfo && !!locationCode} onOpenChange={setOpenDeviceInfo}>
            <SheetContent className="w-full sm:w-[400px] overflow-y-auto px-2 sm:px-4">
                <SheetHeader>
                    <SheetTitle>
                        {fm({ id: message.common.systemOverlay.location })} {locationCode}
                    </SheetTitle>
                </SheetHeader>
                {locationCode && <LocationInfo locationCode={locationCode} />}
            </SheetContent>
        </Sheet>
    )
}
