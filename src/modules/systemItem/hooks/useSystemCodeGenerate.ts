import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

type SystemCodeGenerateQuery = {
  zoneUID?: string
  locationUID?: string
  parentUID?: string
  systemTypeUID?: string
}

export const useSystemCodeGenerate = () => {
  const [query, setQuery] = useState<SystemCodeGenerateQuery>({})

  const { control, setValue } = useFormContext()

  const zoneUID = useWatch({ name: 'zone', control })?.uid
  const locationUID = useWatch({ name: 'location', control })?.uid
  const parentUID = '??'
  const systemTypeUID = useWatch({ name: 'systemType', control })?.uid

  useEffect(() => {
    if (zoneUID) setQuery(prev => ({ ...prev, zoneUID }))
    if (locationUID) setQuery(prev => ({ ...prev, locationUID }))
    if (parentUID) setQuery(prev => ({ ...prev, parentUID }))
    if (systemTypeUID) setQuery(prev => ({ ...prev, systemTypeUID }))
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
    }
  })

  return { systemCode: 'systemCode', getSystemCode: submit, loading, disabled: systemTypeUID === undefined }
}
