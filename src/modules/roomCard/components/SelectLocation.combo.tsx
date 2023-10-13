import { Fragment } from 'react'
import { useEffect, useState } from 'react'

import Combobox from '@/components/form/Combobox'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'

import { useLocation, useSubLocations } from '../hooks/useLocation'
import { updateLocationWithSublocation } from '../utils'

export const SelectLocationTree = ({
  locationField
}: {
  locationField: FieldProps & {
    options?: Option[] | undefined
    codebook?: CODEBOOK | undefined
  }
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
          uid: location.uid,
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
      variables: { where: { uid, roomCard: null } }
    })
  }

  return (
    <Fragment>
      <Combobox
        {...locationField}
        className="w-72"
        onClickIcon={() => {
          setOpen(true)
        }}
      />
      <CodebookTreeModalGraphql
        fetchChildren={fetchChildren}
        data={codebooktree}
        open={open}
        loading={loading}
        setOpen={setOpen}
        name={locationField.name}
      />
    </Fragment>
  )
}
