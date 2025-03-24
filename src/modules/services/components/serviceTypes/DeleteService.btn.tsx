import { TrashIcon } from '@heroicons/react/24/outline'

import { Button } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'

import { useServiceTypeDelete } from '../../hooks/useServiceTypeDelete'

type Props = {
  uid: string
  name: string
}

export const DeleteServiceButton = ({ uid, name }: Props) => {
  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${name} service?`
  )

  const { mutate } = useServiceTypeDelete({ uid })
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    withWarningModal(() => {
      mutate(undefined)
    })()
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="rounded-full bg-red-700 text-gray-200 hover:bg-red-800"
    >
      <TrashIcon className="h-3 w-3" aria-hidden="true" />
    </Button>
  )
}
