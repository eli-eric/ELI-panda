import { useRouter } from 'next/router'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useSystems } from '../hooks/useSystems'

export const SearchBarButtons = () => {
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])
  const { mutate } = useSystems('systems')

  const router = useRouter()

  const handleRefresh = () => {
    mutate()
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
