import type { ColumnDef } from '@tanstack/react-table'
import { Fragment, useEffect, useState } from 'react'

import Combobox from '@/components/form/Combobox'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'

import { useLocation, useSubLocations } from '../../roomCard/hooks/useLocation'
import { updateLocationWithSublocation } from '../../roomCard/utils'

export const SelectLocationTree = ({
  locationField,
  className
}: {
  locationField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  const [codebooktree, setCodebooktree] = useState<Codebooktree[]>([])
  const { locations } = useLocation()
  const { getSubLocations, subLocations, loading } = useSubLocations()
  const [uid, setUid] = useState<string>('')

  useEffect(() => {
    if (locations) {
      setCodebooktree(
        locations.map(location => ({
          name: location.name,
          code: location.code as string,
          uid: location.uid,
          roomCard: location.roomCard,
          isExpandable: location.subLocations.length > 0
        }))
      )
    }
  }, [locations])

  useEffect(() => {
    if (subLocations) {
      setCodebooktree(prev => updateLocationWithSublocation(prev, subLocations, uid))
    }
  }, [subLocations, uid])

  const fetchChildren = (uid: string) => {
    setUid(uid)
    getSubLocations({
      variables: { where: { uid } }
    })
  }

  const additionalColumn: ColumnDef<Codebooktree, string> = {
    header: 'Code',
    accessorKey: 'code',
    id: 'code'
  }

  return (
    <Fragment>
      <Combobox
        {...locationField}
        className={className}
        onClickIcon={() => {
          setOpen(true)
        }}
      />
      <CodebookTreeModalGraphql
        fetchChildren={fetchChildren}
        additionalColumn={additionalColumn}
        data={codebooktree}
        open={open}
        loading={loading}
        setOpen={setOpen}
        name={locationField.name}
      />
    </Fragment>
  )
}
