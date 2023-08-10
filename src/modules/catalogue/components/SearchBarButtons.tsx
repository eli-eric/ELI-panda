import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { Button, PlusButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useCatalogueItems } from '../hooks/useCatalogueItems'

export const SearchBarButtons = () => {
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const { mutate } = useCatalogueItems()

  return (
    <div className="flex">
      <Button
        className="mr-1"
        onClick={() => {
          mutate()
        }}
      >
        <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
      {canEdit && (
        <Link href={PATH.CATALOGUE_ITEM}>
          <PlusButton primary className="mr-1" buttonSize="large" />
        </Link>
      )}
    </div>
  )
}
