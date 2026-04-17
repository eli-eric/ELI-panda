import { useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { useSystemFieldUpdate } from './useSystemFieldUpdate'

type SystemCodeGenerateQuery = {
    zoneUID?: string
    locationUID?: string
    parentUID?: string
    systemTypeUID?: string
}

export const useSystemCodeGenerate = (system: SystemLeaf) => {
    const { formatMessage: fm } = useIntl()
    const { updateField } = useSystemFieldUpdate({
        location: system.location,
        zone: system.zone,
        systemType: system.systemType,
    })

    // Build query from current system values
    const query = useMemo<SystemCodeGenerateQuery>(() => {
        const params: SystemCodeGenerateQuery = {}
        if (system.zone?.uid) params.zoneUID = system.zone.uid
        if (system.location?.uid) params.locationUID = system.location.uid
        if (system.parentUid) params.parentUID = system.parentUid
        if (system.systemType?.uid) params.systemTypeUID = system.systemType.uid
        return params
    }, [system.zone?.uid, system.location?.uid, system.parentUid, system.systemType?.uid])

    const { systemCodeGenerate } = useEndpoint({ query })

    const [isGenerating, setIsGenerating] = useState(false)

    const { submit } = useSubmit<string>({
        endpoint: systemCodeGenerate,
        method: 'get',
        onSuccess: async generatedCode => {
            try {
                // Save generated code immediately
                await updateField(system.uid, 'systemCode', generatedCode, {
                    previousValue: system.systemCode,
                })
                // Success toast is handled by updateField via toast.promise
            } catch (error) {
                // Error toast is handled by updateField
                // eslint-disable-next-line no-console
                console.error('Failed to save generated code:', error)
            } finally {
                setIsGenerating(false)
            }
        },
        onError: err => {
            setIsGenerating(false)
            toast.error(
                fm({ id: message.systemHierarchy.toast.failedToGenerate }) +
                    ': ' +
                    (err.response?.data || err.message),
            )
        },
    })

    const generateCode = useCallback(() => {
        setIsGenerating(true)
        submit()
    }, [submit])

    return {
        generateCode,
        isGenerating,
        disabled: !system.systemType?.uid,
    }
}
