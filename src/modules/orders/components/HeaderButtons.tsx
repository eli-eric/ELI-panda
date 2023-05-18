import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'

import { Button, PlusButton } from '@/components/Buttons'
import useRolePermission from '@/hooks/useRole'
import useMutateListStore from '@/store/useMutateListStore'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const HeaderButtons = () => {
  const canEdit = useRolePermission([ROLE.ORDERS_EDIT])
  const { mutate } = useSWRConfig()
  const { instances } = useMutateListStore()
  const router = useRouter()

  return (
    <div className="flex">
      <Button
        className="mr-1"
        onClick={() => {
          console.log('HeaderButtons', instances['orders']?.mutateUrl)

          mutate(instances['orders'].mutateUrl, undefined, { revalidate: true })
        }}
      >
        <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
      {canEdit && (
        <PlusButton
          primary
          className="mr-1"
          buttonSize="large"
          onClick={() => {
            router.push(PATH.ORDER)
          }}
        />
      )}
    </div>
  )
}

export default HeaderButtons
