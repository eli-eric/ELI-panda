import { useQuery } from '@tanstack/react-query'
import { type FC, useState } from 'react'

import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

import { AddGroupButton } from './components/AddGroupButton'
import { AddSystemTypeButton } from './components/AddSystemTypeButton'
import { SystemTypeGroup } from './components/SystemTypeGroup'
import { SystemTypeItem } from './components/SystemTypeItem'
import type { SystemTypesResponse } from './types'

const SystemTypeEditContainer: FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const { data: systemTypeGroups, refetch: refetchGroups } = useQuery({
    queryKey: ['system-type-groups'],
    queryFn: queryFetcher<CodebookType[]>(`systemTypeGroups`)
  })
  const { data: systemTypes, refetch: refetchSystemTypes } = useQuery({
    queryKey: ['system-types', { uid: selectedGroup }],
    queryFn: queryFetcher<SystemTypesResponse[]>(`systemTypeGroupTypes`),
    enabled: !!selectedGroup
  })

  return (
    <div className="flex flex-col pt-4 w-full  dark:shadow-slate-100 dark:text-gray-200">
      <div className="flex w-full justify-center">
        <div className="flex-1 mr-2 justify-center">
          <div className="text-center flex justify-between px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-md shadow-sm">
            Groups
            <AddGroupButton refetch={refetchGroups} />
          </div>
          <ul className="">
            {systemTypeGroups?.map(item => (
              <SystemTypeGroup
                key={item.uid}
                systemTypeGroup={item}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                refetch={refetchGroups}
              />
            ))}
          </ul>
        </div>
        <div className="flex-1 justify-center">
          <div className="text-center flex justify-between px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-md shadow-sm">
            System Types
            <AddSystemTypeButton
              selectedGroup={selectedGroup}
              refetch={refetchSystemTypes}
            />
          </div>
          <ul>
            {systemTypes?.map(item => (
              <SystemTypeItem
                groupUid={selectedGroup}
                key={item.uid}
                systemType={item}
                refetch={refetchSystemTypes}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SystemTypeEditContainer
