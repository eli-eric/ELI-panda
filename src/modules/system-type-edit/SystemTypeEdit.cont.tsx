import axiosInstance from '@/core/axios/axiosInstance'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { BASE_URL } from '@/types/constants/common'
import { useQuery } from '@tanstack/react-query'
import { useState, type FC } from 'react'
import { SystemTypeGroup } from './components/SystemTypeGroup'
import type { SystemTypesResponse } from './types'
import { AddGroupButton } from './components/AddGroupButton'
import { AddSystemTypeButton } from './components/AddSystemTypeButton'
import { SystemTypeItem } from './components/SystemTypeItem'

const SystemTypeEditContainer: FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  //TODO: Bit refactor after merge with react-query branch
  const { data: systemTypeGroups, refetch: refetchGroups } = useQuery<
    CodebookType[]
  >({
    queryKey: ['system-types-groups'],
    queryFn: async () => {
      const res = axiosInstance
        .get(BASE_URL + '/system/system-type-groups')
        .then(res => res.data)
      return res
    }
  })
  //TODO: Bit refactor after merge with react-query branch
  const { data: systemTypes, refetch: refetchSystemTypes } = useQuery<
    SystemTypesResponse[]
  >({
    queryKey: ['system-types', selectedGroup],
    queryFn: async () => {
      const res = axiosInstance
        .get(
          BASE_URL + `/system/system-type-group/${selectedGroup}/system-types`
        )
        .then(res => res.data)
      return res
    },
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
