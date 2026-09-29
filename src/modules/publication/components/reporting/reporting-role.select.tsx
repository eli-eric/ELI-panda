import { Controller, useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'

const { reporting } = message.publication

const UNKNOWN = 'unknown'

type Props = {
    name: string
    label: string
    disabled?: boolean
}

/**
 * Three-state authorship role. A role nobody has confirmed stays null rather
 * than defaulting to "no", so analytics can report unknown roles separately from
 * confirmed negatives instead of flattering the first-author counts.
 */
export const ReportingRoleSelect = ({ name, label, disabled }: Props) => {
    const { control } = useFormContext()
    const { formatMessage: fm } = useIntl()

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field }) => (
                <div className="space-y-1 w-full">
                    <Label>{label}</Label>
                    <Select
                        disabled={disabled}
                        value={
                            field.value === null || field.value === undefined
                                ? UNKNOWN
                                : String(field.value)
                        }
                        onValueChange={value =>
                            field.onChange(value === UNKNOWN ? null : value === 'true')
                        }
                    >
                        <SelectTrigger data-testid={name}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={UNKNOWN}>
                                {fm({ id: reporting.roleUnknown })}
                            </SelectItem>
                            <SelectItem value="true">{fm({ id: reporting.roleYes })}</SelectItem>
                            <SelectItem value="false">{fm({ id: reporting.roleNo })}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}
        />
    )
}
