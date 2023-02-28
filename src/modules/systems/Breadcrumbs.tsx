import { Fragment } from 'react'
import { fetchFakeSystems } from 'src/pages/systems/[slug]'
import useSWR from 'swr'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'

import { useSystemEdit } from './hooks/useSystemEdit'

const Breadcrumbs = ({ path }: { path?: string[] }) => {
  const { data } = useSWR(path, fetchFakeSystems)
  const { AddButton } = useSystemEdit({})
  return (
    <BreadcrumpContainer homeLink="/systems">
      <Fragment>
        {data?.map(({ uid, name }) => (
          <BreadcrumpItem key={uid} name={name} link={'/systems/' + uid} />
        ))}
        <AddButton />
      </Fragment>
    </BreadcrumpContainer>
  )
}

export default Breadcrumbs
