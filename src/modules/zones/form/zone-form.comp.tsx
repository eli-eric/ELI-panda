import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { message } from '@/i18n/src/messages'

import type { Zone } from '../types/zone.types'

interface Props {
    disabled?: boolean
    parentZoneOptions?: Zone[]
}

export const ZoneFormFields: FC<Props> = ({ disabled = false, parentZoneOptions = [] }) => {
    const { formatMessage: fm } = useIntl()
    const labels = message.zonesPage.form

    const parentOptions = parentZoneOptions
        .filter(z => !z.parentZone)
        .map(z => ({ uid: z.uid, name: `${z.name} (${z.code})` }))

    return (
        <div className="flex flex-col gap-4 py-4">
            <Input
                name="name"
                label={fm({ id: labels.name.label })}
                placeholder={fm({ id: labels.name.placeholder })}
                disabled={disabled}
                required
            />
            <Input
                name="code"
                label={fm({ id: labels.code.label })}
                placeholder={fm({ id: labels.code.placeholder })}
                disabled={disabled}
                required
            />
            <Listbox
                name="parentUid"
                customLabel={fm({ id: labels.parentZone.label })}
                placeholder={fm({ id: labels.parentZone.placeholder })}
                customOptions={parentOptions}
                allowEmptyOption
                emptyOption={fm({ id: labels.emptyParent })}
                disabled={disabled}
            />
        </div>
    )
}
