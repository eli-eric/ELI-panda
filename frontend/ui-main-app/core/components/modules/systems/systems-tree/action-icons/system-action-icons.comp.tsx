import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'

import FormContext from '../../../../../store/form.context'

interface Props {
  uid: string
}

const SystemActionIconsComponent = ({ uid }: Props) => {
  const { edit, add, setEdit, setAdd, setUid } = useContext(FormContext)

  const disabled = edit || add
  const customClass = `h-5 w-5 ${disabled ? '' : 'hover:text-primary-500 hover:cursor-pointer'}`

  return (
    <div className="flex">
      <PencilSquareIcon
        onClick={() => {
          if (!disabled) {
            setUid(uid)
            setEdit(true)
          }
        }}
        className={customClass}
      />
      <TrashIcon className={customClass} />

      <PlusIcon
        onClick={() => {
          if (!disabled) {
            setUid(uid)
            setAdd(true)
          }
        }}
        className={customClass}
      />
    </div>
  )
}

export default SystemActionIconsComponent
