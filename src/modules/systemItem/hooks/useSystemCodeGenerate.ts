import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'

import { useSystemDetail } from './useSystemDetail'

type SystemCodeGenerateQuery = {
  zoneUID?: string
  locationUID?: string
  parentUID?: string
  systemTypeUID?: string
}

export const useSystemCodeGenerate = () => {
  const [query, setQuery] = useState<SystemCodeGenerateQuery>({})
  const { systemDetail } = useSystemDetail()
  const { control, setValue } = useFormContext()

  const zoneUID = useWatch({ name: 'zone', control })?.uid
  const locationUID = useWatch({ name: 'location', control })?.uid
  const parentUID = systemDetail?.parentSystem?.uid
  const systemTypeUID = useWatch({ name: 'systemType', control })?.uid

  useEffect(() => {
    if (zoneUID) setQuery(prev => ({ ...prev, zoneUID }))
    if (locationUID) setQuery(prev => ({ ...prev, locationUID }))
    if (parentUID) setQuery(prev => ({ ...prev, parentUID }))
    if (systemTypeUID) setQuery(prev => ({ ...prev, systemTypeUID }))
    if (!zoneUID) {
      setQuery(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { zoneUID, ...rest } = prev
        return rest
      })
    }
    if (!locationUID) {
      setQuery(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { locationUID, ...rest } = prev
        return rest
      })
    }
    if (!parentUID) {
      setQuery(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { parentUID, ...rest } = prev
        return rest
      })
    }
    if (!systemTypeUID) {
      setQuery(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { systemTypeUID, ...rest } = prev
        return rest
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoneUID, locationUID, parentUID, systemTypeUID])

  const { systemCodeGenerate } = useEndpoint({
    query
  })

  const { submit, loading } = useSubmit({
    endpoint: systemCodeGenerate,
    method: 'get',
    onSuccess: res => {
      setValue('systemCode', res)
    },
    onError: err => {
      toast.error('Failed to generate system code: ' + err.response?.data)
    }
  })

  return {
    systemCode: 'systemCode',
    getSystemCode: submit,
    loading,
    disabled: systemTypeUID === undefined
  }
}
