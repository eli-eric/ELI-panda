import type { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import { TextArea } from '@/components/form/inputs/components/TextArea.comp'
import Listbox from '@/components/form/Listbox'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import type { CodebookType } from '@/types/responses/codebook'

import type { Zone } from '../types/zone.types'

interface Props {
    disabled?: boolean
    parentZoneOptions?: Zone[]
}

export const ZoneFormFields: FC<Props> = ({ disabled = false, parentZoneOptions = [] }) => {
    const { formatMessage: fm } = useIntl()
    const { setValue } = useFormContext()
    const labels = message.zonesPage.form

    const parentOptions = parentZoneOptions
        .filter(z => !z.parentZone)
        .map(z => ({ uid: z.uid, name: `${z.name} (${z.code})` }))

    // SelectSystemComboBox and ModalSelect both call setValue without shouldDirty, so
    // without this the picker would never mark the form dirty — losing the unsaved-changes
    // indicator and the exit protection. onChange fires on both pick and clear.
    const handleDefaultParentSystemChange = (value?: CodebookType | null) =>
        setValue('defaultParentSystem', value ?? null, { shouldDirty: true })

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
            <div className="space-y-1">
                <Label>{fm({ id: labels.defaultParentSystem.label })}</Label>
                <SelectSystemComboBox
                    selectSystemField={{
                        name: 'defaultParentSystem',
                        label: '',
                        placeholder: fm({ id: labels.defaultParentSystem.placeholder }),
                        disabled,
                    }}
                    disabled={disabled}
                    onChange={handleDefaultParentSystemChange}
                />
            </div>
            <TextArea
                name="notes"
                label={fm({ id: labels.notes.label })}
                placeholder={fm({ id: labels.notes.placeholder })}
                disabled={disabled}
            />
        </div>
    )
}
