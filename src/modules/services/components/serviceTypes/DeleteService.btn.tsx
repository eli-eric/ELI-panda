import { Trash2 } from 'lucide-react'

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
  const handleClick = () => {
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
      <Trash2 className="h-3 w-3" aria-hidden="true" />
    </Button>
  )
}
