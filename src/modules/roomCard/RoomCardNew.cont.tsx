import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { CodebookTreeModalGraphql } from '@/components/form/shared/CodebookTreeModalGraphql'
import Card from '@/components/layout/Card'
import { PageHead } from '@/components/layout/PageHead'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { CODEBOOK } from '@/types/constants/codebook'
import type { Location, RoomCard } from '@/types/gql/graphql'

import { useLocation, useSubLocations } from './hooks/useLocation'

const updateLocationWithSublocation = (locations: Codebooktree[], subLocations: Location[], uid) =>
  locations.map(location => {
    if (location.uid === uid) {
      return {
        ...location,
        children: subLocations.map(subLocation => ({
          name: subLocation.name,
          uid: subLocation.uid,
          isExpandable: subLocation.subLocations.length > 0
        }))
      }
    }
    if (location.children) {
      return {
        ...location,
        children: updateLocationWithSublocation(location.children, subLocations, uid)
      }
    }
    return location
  })

export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCard>()
  const [open, setOpen] = useState(false)
  const [uid, setUid] = useState<string>('')
  const [codebooktree, setCodebooktree] = useState<Codebooktree[]>([])

  const { locations } = useLocation()
  const { getSubLocations, subLocations, loading } = useSubLocations()

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

  const fields = useMakeFormFields({
    codebook: {
      name: 'location',
      disabled: false,
      codebook: CODEBOOK.LOCATION
    }
  })

  const fetchChildren = (uid: string) => {
    setUid(uid)
    getSubLocations({
      variables: { where: { uid, roomCard: null } }
    })
  }

  return (
    <Form {...{ formMethods }}>
      <PageHead>
        <h1 className="text-2xl font-semibold">New room card</h1>
        <Combobox
          {...fields.codebook}
          className="w-72 items-center"
          onClickIcon={() => {
            setOpen(true)
          }}
        />
      </PageHead>
      <Card>
        <div>RoomCardNew</div>
      </Card>
      <CodebookTreeModalGraphql
        fetchChildren={fetchChildren}
        data={codebooktree}
        open={open}
        loading={loading}
        setOpen={setOpen}
        name={fields.codebook.name}
      />
    </Form>
  )
}
