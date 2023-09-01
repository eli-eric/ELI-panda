import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import { BASE_URL } from '@/types/constants/common'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useSystems } from '../hooks/useSystems'
import type { SystemDetail } from '../types/responses'

export const SearchBarButtons = () => {
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])
  const { mutate: systemsMutate } = useSystems('systems')

  const router = useRouter()

  const handleRefresh = () => {
    systemsMutate(
      async systems => {
        try {
          const newSystems = await axiosInstance.get(BASE_URL + '/systems' + '?pagination={"page":1,"pageSize":50}')
          const newSubSystems = await Promise.all<SystemDetail[]>(
            newSystems?.data?.data?.map(async system => {
              const newSubSystem = await axiosInstance.get<SystemDetail[]>(
                BASE_URL + '/system/' + system.uid + '/subsystems'
              )
              return { ...system, subSystems: newSubSystem.data }
            })
          )
          return { ...newSystems.data, data: newSubSystems }
        } catch (error) {
          toast.error('Error refreshing systems')
          return systems
        }
      },
      { revalidate: false }
    )
  }

  const handleAdd = () => {
    router.push(PATH.SYSTEM)
  }

  return (
    <div className="flex">
      <RefreshButton className="mr-1" buttonSize="large" onClick={handleRefresh} />
      {canEdit && <PlusButton primary className="mr-1" buttonSize="large" onClick={handleAdd} />}
    </div>
  )
}
