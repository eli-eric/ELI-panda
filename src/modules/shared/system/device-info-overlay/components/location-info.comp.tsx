import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

type Props = {
    locationCode: string
}

export const LocationInfo = ({ locationCode }: Props) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
                <div>
                    <span className="font-medium">
                        {fm({ id: message.common.systemOverlay.location })}
                    </span>{' '}
                    {locationCode}
                </div>
            </div>
        </div>
    )
}
