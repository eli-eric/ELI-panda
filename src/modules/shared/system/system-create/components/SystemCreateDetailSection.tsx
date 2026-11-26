import { Loader2, Wand2 } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'

import {
    InlineEditCombobox,
    InlineEditInput,
    InlineEditListbox,
    InlineEditLocation,
    InlineEditSystemType,
    InlineEditTextArea,
} from '@/components/form/inline-edit'
import { InlineEditInputWithActions } from '@/components/form/inline-edit/InlineEditInputWithActions'
import { Tooltip } from '@/components/Tooltip'
import { Disclosure } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'
import { getBadgeVariantBySystemLevel, getFontBySystemLevel } from '@/modules/systemItem/utils'
import { SystemLevel } from '@/types/constants/systemLevel'

// Create flow only: the system does not exist yet, so the code can be generated
// into the form but never released (that is a PATCH on an existing system).
const GenerateSystemCodeButton = () => {
    const { loading, getSystemCode, disabled } = useSystemCodeGenerate()
    return (
        <Tooltip content="Generate system code">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || loading}
                onClick={() => getSystemCode()}
                className="h-6 w-6 p-0 hover:bg-primary/10"
                aria-label="Generate system code"
            >
                {loading ? (
                    <Loader2 className="size-3 animate-spin" />
                ) : (
                    <Wand2 className="size-3 text-primary hover:text-primary/80" />
                )}
            </Button>
        </Tooltip>
    )
}

/** Form-based (RHF) system fields of the root "Create System" sheet. */
export const SystemCreateDetailSection = () => {
    const fields = useSystemEditFormFields(true)

    const { control } = useFormContext()

    const systemLevel = useWatch({ control, name: 'systemLevel' })
    const systemCode = useWatch({ control, name: 'systemCode' })
    const systemLevels = Object.values(SystemLevel).map(level => level)

    return (
        <Disclosure
            title={`System Details${systemCode ? ` - ${systemCode}` : ''}`}
            className={cn(`w-full border-l border-r border-b rounded-md overflow-hidden shadow-md`)}
            buttonClassName={cn(
                getFontBySystemLevel(systemLevel as SystemLevel),
                getBadgeVariantBySystemLevel(systemLevel as SystemLevel),
            )}
        >
            <div className="flex flex-col p-2 gap-y-2">
                <InlineEditInput {...fields.name} />
                <InlineEditSystemType {...fields.systemType} />
                <InlineEditInputWithActions
                    {...fields.systemCode}
                    actions={<GenerateSystemCodeButton />}
                />
                <InlineEditListbox {...fields.systemLevel} customOptions={systemLevels} />
                <InlineEditLocation {...fields.location} />
                <InlineEditCombobox {...fields.zone} />
                {systemLevel === SystemLevel.KeySystems && (
                    <InlineEditListbox {...fields.attribute} />
                )}
                <InlineEditTextArea {...fields.description} />
            </div>
        </Disclosure>
    )
}
